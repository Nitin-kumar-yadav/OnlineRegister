import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useRegisterStore } from '../store/useRegisterStore';
import Loader from './Loader';
import heroImg from '../assets/hero.png';
import toast from 'react-hot-toast';
import { FaTrash, FaFileExcel, FaChevronLeft, FaChevronRight, FaCalendarAlt, FaTimes } from 'react-icons/fa';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const ENTRIES_PER_PAGE = 20;
const WORD_LIMIT = 10;

const truncateText = (text, limit = WORD_LIMIT) => {
    if (text == null || text === '') return '—';
    const str = String(text);
    const words = str.split(/\s+/);
    if (words.length <= limit) return str;
    return words.slice(0, limit).join(' ') + '…';
};

const ViewRegister = () => {
    const { id } = useParams();
    const { fields, entries, getFields, getEntries, addEntry, deleteEntry } = useRegisterStore();
    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [filterDate, setFilterDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getFields(id);
        getEntries(id);
    }, [id, getFields, getEntries]);

    useEffect(() => {
        if (fields?.fields) {
            const initial = {};
            fields.fields.forEach((f) => { initial[f.name] = ''; });
            setFormData(initial);
        }
    }, [fields]);

    // Filter entries by date
    const filteredEntries = useMemo(() => {
        if (!entries) return [];
        if (!filterDate) return entries;

        return entries.filter((entry) => {
            if (!entry.createdAt) return false;
            const entryDate = new Date(entry.createdAt).toISOString().split('T')[0];
            return entryDate === filterDate;
        });
    }, [entries, filterDate]);

    // Pagination logic
    const totalPages = Math.max(1, Math.ceil(filteredEntries.length / ENTRIES_PER_PAGE));
    const paginatedEntries = useMemo(() => {
        const startIndex = (currentPage - 1) * ENTRIES_PER_PAGE;
        return filteredEntries.slice(startIndex, startIndex + ENTRIES_PER_PAGE);
    }, [filteredEntries, currentPage]);

    // Reset to page 1 when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filterDate]);

    // Clamp current page if total pages shrinks (e.g. after deletion)
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [totalPages, currentPage]);

    if (!fields || !entries) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    const fieldList = fields.fields || [];
    const registerName = fields.registerName || 'Register';

    const handleInputChange = (fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));
    };

    const handleSubmit = async () => {
        const hasValue = Object.values(formData).some((v) => v.trim() !== '');
        if (!hasValue) {
            toast.error('Please fill in at least one field');
            return;
        }

        setIsSubmitting(true);
        try {
            const data = {};
            Object.entries(formData).forEach(([key, val]) => {
                if (val.trim() !== '') data[key] = val.trim();
            });
            await addEntry(id, data);
            toast.success('Entry added successfully');
            const reset = {};
            fieldList.forEach((f) => { reset[f.name] = ''; });
            setFormData(reset);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add entry');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    const getInputType = (fieldType) => {
        switch (fieldType) {
            case 'Number': return 'number';
            case 'Date': return 'date';
            default: return 'text';
        }
    };

    const handleExportExcel = () => {
        const dataToExport = filterDate ? filteredEntries : entries;
        if (!dataToExport || dataToExport.length === 0) {
            toast.error('No entries to export');
            return;
        }

        const rows = dataToExport.map((entry, index) => {
            const row = { '#': index + 1 };
            fieldList.forEach((field) => {
                row[field.name] = entry.data?.[field.name] ?? '';
            });
            row['IP'] = entry.systemIP || '';
            row['Created'] = entry.createdAt
                ? new Date(entry.createdAt).toLocaleString()
                : '';
            return row;
        });

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, registerName);
        XLSX.writeFile(workbook, `${registerName}.xlsx`);
        toast.success('Exported to Excel');
    };

    // Generate page numbers to display
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage + 1 < maxVisible) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const startEntry = filteredEntries.length === 0 ? 0 : (currentPage - 1) * ENTRIES_PER_PAGE + 1;
    const endEntry = Math.min(currentPage * ENTRIES_PER_PAGE, filteredEntries.length);

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center gap-6" style={{ marginTop: "120px" }}>

            <div className="fixed inset-0 z-0">
                <img
                    src={heroImg}
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 px-4 sm:px-8 pb-12 w-full max-w-7xl mx-auto">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-wide drop-shadow-lg">
                            {registerName}
                        </h1>
                        <p className="mt-2 text-gray-300 text-sm">
                            {filterDate
                                ? `${filteredEntries.length} of ${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} (filtered)`
                                : `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'} found`
                            }
                        </p>
                    </div>
                    {entries.length > 0 && (
                        <button
                            onClick={handleExportExcel}
                            className="flex items-center gap-2 px-5 py-3 text-sm font-medium text-green-400 bg-green-500/10 border border-green-500/25 hover:bg-green-500/20 hover:border-green-500/40 rounded-lg transition-all duration-200 cursor-pointer whitespace-nowrap"
                        >
                            <FaFileExcel size={16} />
                            Export Excel
                        </button>
                    )}
                </div>

                {/* Date Filter */}
                {entries.length > 0 && (
                    <div className="mb-5 flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-lg">
                            <FaCalendarAlt size={14} className="text-indigo-400" />
                            <span className="text-sm text-gray-300 font-medium">Filter by Date:</span>
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="px-3 py-1.5 text-sm text-white bg-white/10 border border-white/15 rounded-md outline-none focus:border-indigo-400 focus:bg-white/15 transition-all duration-200"
                                style={{ colorScheme: 'dark' }}
                            />
                            {filterDate && (
                                <button
                                    onClick={() => setFilterDate('')}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 rounded-md transition-all duration-200 cursor-pointer"
                                >
                                    <FaTimes size={10} />
                                    Clear
                                </button>
                            )}
                        </div>
                        {filterDate && (
                            <span className="text-xs text-indigo-300/70 italic">
                                Showing entries from {new Date(filterDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </span>
                        )}
                    </div>
                )}

                {fieldList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                        <p className="text-gray-300 text-lg">No fields configured for this register.</p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-md border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/15">
                                        <th className="px-6 py-5 text-sm font-semibold uppercase tracking-widest text-indigo-300">
                                            #
                                        </th>
                                        {fieldList.map((field) => (
                                            <th
                                                key={field._id}
                                                className="px-6 py-5 text-sm font-semibold uppercase tracking-widest text-indigo-300"
                                            >
                                                {field.name}
                                            </th>
                                        ))}
                                        <th className="px-6 py-5 text-sm font-semibold uppercase tracking-widest text-indigo-300">
                                            IP
                                        </th>
                                        <th className="px-6 py-5 text-sm font-semibold uppercase tracking-widest text-indigo-300">
                                            Created
                                        </th>
                                        <th className="px-6 py-5 text-sm font-semibold uppercase tracking-widest text-indigo-300">
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr className="border-b border-indigo-500/20 bg-white/[0.03]">
                                        <td className="px-6 py-4">
                                            <span className="text-indigo-400 text-base font-medium">New</span>
                                        </td>
                                        {fieldList.map((field) => (
                                            <td key={field._id} className="px-6 py-4">
                                                <input
                                                    type={getInputType(field.type)}
                                                    value={formData[field.name] || ''}
                                                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                    onKeyDown={handleKeyDown}
                                                    placeholder={field.name}
                                                    className="w-full min-w-[180px] px-4 py-3 text-base text-white bg-white/10 border border-white/15 rounded-md placeholder-gray-500 outline-none focus:border-indigo-400 focus:bg-white/15 transition-all duration-200"
                                                />
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 text-base text-gray-500 italic">Auto</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={isSubmitting}
                                                className="px-5 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                            >
                                                {isSubmitting ? 'Adding...' : '+ Add'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4"></td>
                                    </tr>
                                    {filteredEntries.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={fieldList.length + 4}
                                                className="px-5 py-16 text-center text-gray-400"
                                            >
                                                {filterDate
                                                    ? 'No entries found for the selected date.'
                                                    : 'No entries yet. Add your first one above.'
                                                }
                                            </td>
                                        </tr>
                                    ) : (
                                        paginatedEntries.map((entry, index) => (
                                            <tr
                                                key={entry._id}
                                                className="border-b border-white/5 transition-colors duration-200 hover:bg-white/10"
                                            >
                                                <td className="px-5 py-4 text-sm text-gray-400 font-mono">
                                                    {(currentPage - 1) * ENTRIES_PER_PAGE + index + 1}
                                                </td>
                                                {fieldList.map((field) => {
                                                    const rawValue = entry.data?.[field.name];
                                                    const fullText = rawValue != null ? String(rawValue) : '';
                                                    const displayText = truncateText(rawValue);
                                                    const isTruncated = displayText !== fullText && displayText !== '—';
                                                    return (
                                                        <td
                                                            key={field._id}
                                                            className="px-5 py-4 text-sm text-gray-100 max-w-[250px]"
                                                            title={isTruncated ? fullText : undefined}
                                                        >
                                                            <span className={isTruncated ? 'cursor-help border-b border-dotted border-gray-500' : ''}>
                                                                {displayText}
                                                            </span>
                                                        </td>
                                                    );
                                                })}
                                                <td className="px-5 py-4 text-sm text-gray-400 font-mono">
                                                    {entry.systemIP || '—'}
                                                </td>
                                                <td className="px-5 py-4 text-sm text-gray-400 whitespace-nowrap">
                                                    {entry.createdAt
                                                        ? new Date(entry.createdAt).toLocaleString()
                                                        : '—'}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <button
                                                        onClick={async () => {
                                                            setDeletingId(entry._id);
                                                            try {
                                                                await deleteEntry(entry._id, id);
                                                                toast.success('Entry deleted');
                                                            } catch (err) {
                                                                toast.error(err.response?.data?.message || 'Failed to delete');
                                                            } finally {
                                                                setDeletingId(null);
                                                            }
                                                        }}
                                                        disabled={deletingId === entry._id}
                                                        className="text-red-500/60 hover:text-red-400 transition-colors duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {filteredEntries.length > ENTRIES_PER_PAGE && (
                            <div className="mt-5 flex items-center justify-between px-2">
                                <p className="text-sm text-gray-400">
                                    Showing <span className="text-white font-medium">{startEntry}</span> – <span className="text-white font-medium">{endEntry}</span> of <span className="text-white font-medium">{filteredEntries.length}</span> entries
                                </p>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center justify-center w-9 h-9 rounded-md text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <FaChevronLeft size={12} />
                                    </button>

                                    {getPageNumbers()[0] > 1 && (
                                        <>
                                            <button
                                                onClick={() => setCurrentPage(1)}
                                                className="flex items-center justify-center w-9 h-9 rounded-md text-sm text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
                                            >
                                                1
                                            </button>
                                            {getPageNumbers()[0] > 2 && (
                                                <span className="px-1 text-gray-500 text-sm">…</span>
                                            )}
                                        </>
                                    )}

                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`flex items-center justify-center w-9 h-9 rounded-md text-sm font-medium transition-all duration-200 cursor-pointer ${
                                                currentPage === page
                                                    ? 'bg-indigo-600 text-white border border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]'
                                                    : 'text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                                        <>
                                            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                                                <span className="px-1 text-gray-500 text-sm">…</span>
                                            )}
                                            <button
                                                onClick={() => setCurrentPage(totalPages)}
                                                className="flex items-center justify-center w-9 h-9 rounded-md text-sm text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer"
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="flex items-center justify-center w-9 h-9 rounded-md text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                    >
                                        <FaChevronRight size={12} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ViewRegister;