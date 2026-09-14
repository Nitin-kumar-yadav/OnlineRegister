import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useRegisterStore } from '../store/useRegisterStore';
import Loader from './Loader';
import heroImg from '../assets/hero.png';
import toast from 'react-hot-toast';
import {
    FaTrash, FaFileExcel, FaChevronLeft, FaChevronRight,
    FaCalendarAlt, FaTimes, FaPlus, FaHashtag, FaGlobe, FaClock
} from 'react-icons/fa';
import * as XLSX from 'xlsx';

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
    const {
        fields, entries, totalEntries, totalPages, currentPage,
        getFields, getEntries, getEntriesForExport, addEntry, deleteEntry,
    } = useRegisterStore();

    const [formData, setFormData] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [filterDate, setFilterDate] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [showAddRow, setShowAddRow] = useState(false);

    const fetchEntries = useCallback(async (page = 1, date = filterDate) => {
        setIsLoading(true);
        try {
            await getEntries(id, { page, limit: ENTRIES_PER_PAGE, date });
        } finally {
            setIsLoading(false);
        }
    }, [id, getEntries, filterDate]);

    useEffect(() => {
        getFields(id);
        fetchEntries(1, '');
    }, [id, getFields]);

    useEffect(() => {
        if (fields?.fields) {
            const initial = {};
            fields.fields.forEach((f) => { initial[f.name] = ''; });
            setFormData(initial);
        }
    }, [fields]);

    // When filter date changes, reset to page 1 and refetch
    useEffect(() => {
        fetchEntries(1, filterDate);
    }, [filterDate]);

    const handlePageChange = (page) => {
        fetchEntries(page, filterDate);
    };

    if (!fields || entries === null) {
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
            setShowAddRow(false);
            await fetchEntries(1, filterDate);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add entry');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
        if (e.key === 'Escape') {
            setShowAddRow(false);
            const reset = {};
            fieldList.forEach((f) => { reset[f.name] = ''; });
            setFormData(reset);
        }
    };

    const getInputType = (fieldType) => {
        switch (fieldType) {
            case 'Number': return 'number';
            case 'Date': return 'date';
            default: return 'text';
        }
    };

    const handleExportExcel = async () => {
        try {
            const allEntries = await getEntriesForExport(id, filterDate);
            if (!allEntries || allEntries.length === 0) {
                toast.error('No entries to export');
                return;
            }

            const rows = allEntries.map((entry, index) => {
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
        } catch (error) {
            toast.error('Failed to export');
        }
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

    const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * ENTRIES_PER_PAGE + 1;
    const endEntry = Math.min(currentPage * ENTRIES_PER_PAGE, totalEntries);

    return (
        <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center" style={{ marginTop: "120px" }}>

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <img src={heroImg} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16 w-full max-w-[1400px] mx-auto">

                {/* ── Header Section ── */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            {/* Animated gradient icon */}
                            <div className="relative flex-shrink-0">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                                    <span className="text-white text-xl font-bold tracking-wider">
                                        {registerName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-lg -z-10 animate-pulse" />
                            </div>
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                                    {registerName}
                                </h1>
                                <p className="mt-1 text-sm text-gray-400">
                                    {filterDate ? (
                                        <><span className="text-indigo-400 font-medium">{totalEntries}</span> {totalEntries === 1 ? 'entry' : 'entries'} on {new Date(filterDate + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</>
                                    ) : (
                                        <><span className="text-indigo-400 font-medium">{totalEntries}</span> total {totalEntries === 1 ? 'entry' : 'entries'}</>
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2.5">
                            {totalEntries > 0 && (
                                <button
                                    onClick={handleExportExcel}
                                    className="group/btn flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-emerald-400 bg-emerald-500/8 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/35 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] rounded-xl transition-all duration-300 cursor-pointer"
                                >
                                    <FaFileExcel size={14} className="group-hover/btn:scale-110 transition-transform duration-200" />
                                    Export
                                </button>
                            )}
                            {fieldList.length > 0 && (
                                <button
                                    onClick={() => setShowAddRow(!showAddRow)}
                                    className={`group/btn flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer ${showAddRow
                                            ? 'text-white bg-indigo-600 border border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                                            : 'text-indigo-400 bg-indigo-500/8 border border-indigo-500/20 hover:bg-indigo-500/15 hover:border-indigo-500/35 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                                        }`}
                                >
                                    <FaPlus size={12} className={`transition-transform duration-300 ${showAddRow ? 'rotate-45' : 'group-hover/btn:rotate-90'}`} />
                                    {showAddRow ? 'Cancel' : 'Add Entry'}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Date Filter */}
                    {(totalEntries > 0 || filterDate) && (
                        <div className="mt-5 flex items-center gap-3 flex-wrap">
                            <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] rounded-xl">
                                <FaCalendarAlt size={13} className="text-indigo-400/80" />
                                <input
                                    type="date"
                                    value={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}
                                    className="px-2.5 py-1 text-sm text-white bg-white/[0.06] border border-white/[0.1] rounded-lg outline-none focus:border-indigo-500/50 focus:bg-white/[0.1] focus:shadow-[0_0_12px_rgba(99,102,241,0.15)] transition-all duration-300"
                                    style={{ colorScheme: 'dark' }}
                                />
                                {filterDate && (
                                    <button
                                        onClick={() => setFilterDate('')}
                                        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-red-400/80 bg-red-500/8 border border-red-500/15 hover:bg-red-500/15 hover:text-red-400 rounded-lg transition-all duration-200 cursor-pointer"
                                    >
                                        <FaTimes size={9} />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Table Section ── */}
                {fieldList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-white/[0.03] backdrop-blur-2xl rounded-2xl border border-white/[0.08]">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center mb-4">
                            <FaHashtag size={24} className="text-indigo-400/60" />
                        </div>
                        <p className="text-gray-400 text-base">No fields configured for this register.</p>
                        <p className="text-gray-500 text-sm mt-1">Set up field headers to start adding entries.</p>
                    </div>
                ) : (
                    <>
                        {/* ── Add Entry Panel ── */}
                        <div
                            className={`overflow-hidden transition-all duration-400 ease-out ${showAddRow ? 'max-h-[300px] opacity-100 mb-5' : 'max-h-0 opacity-0 mb-0'
                                }`}
                        >
                            <div className="relative p-5 bg-gradient-to-r from-indigo-500/[0.06] via-purple-500/[0.04] to-indigo-500/[0.06] backdrop-blur-2xl rounded-2xl border border-indigo-500/15">
                                {/* Subtle glow line at top */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-7 h-7 rounded-lg bg-indigo-500/15 flex items-center justify-center">
                                        <FaPlus size={10} className="text-indigo-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-indigo-300 tracking-wide uppercase">New Entry</span>
                                </div>

                                <div className="flex flex-wrap gap-3 items-end">
                                    {fieldList.map((field) => (
                                        <div key={field._id} className="flex-1 min-w-[180px]">
                                            <label className="block text-xs font-medium text-gray-400 mb-1.5 tracking-wide uppercase">
                                                {field.name}
                                            </label>
                                            <input
                                                type={getInputType(field.type)}
                                                value={formData[field.name] || ''}
                                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                placeholder={`Enter ${field.name.toLowerCase()}`}
                                                className="w-full px-3.5 py-2.5 text-sm text-white bg-white/[0.06] border border-white/[0.1] rounded-xl placeholder-gray-500/60 outline-none focus:border-indigo-500/50 focus:bg-white/[0.1] focus:shadow-[0_0_16px_rgba(99,102,241,0.12)] transition-all duration-300"
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none whitespace-nowrap"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Adding…
                                            </span>
                                        ) : 'Add Entry'}
                                    </button>
                                </div>
                                <p className="mt-3 text-xs text-gray-500">Press <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] border border-white/[0.1] rounded">Enter</kbd> to submit · <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] border border-white/[0.1] rounded">Esc</kbd> to cancel</p>
                            </div>
                        </div>

                        {/* ── Data Table ── */}
                        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.025] backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)] overflow-hidden">
                            {/* Top gradient line */}
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

                            {/* Loading overlay */}
                            {isLoading && entries?.length > 0 && (
                                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-20 flex items-center justify-center">
                                    <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                                </div>
                            )}

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/[0.08] bg-white/[0.025]">
                                            <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300/70 whitespace-nowrap">
                                                <span className="flex items-center gap-1.5">
                                                    <FaHashtag size={9} className="opacity-60" />
                                                    S.No
                                                </span>
                                            </th>
                                            {fieldList.map((field) => (
                                                <th
                                                    key={field._id}
                                                    className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300/70 whitespace-nowrap"
                                                >
                                                    {field.name}
                                                </th>
                                            ))}
                                            <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300/70 whitespace-nowrap">
                                                <span className="flex items-center gap-1.5">
                                                    <FaGlobe size={9} className="opacity-60" />
                                                    IP Address
                                                </span>
                                            </th>
                                            <th className="px-5 py-4 text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-300/70 whitespace-nowrap">
                                                <span className="flex items-center gap-1.5">
                                                    <FaClock size={9} className="opacity-60" />
                                                    Created
                                                </span>
                                            </th>
                                            <th className="px-5 py-4 w-12"></th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-white/[0.04]">
                                        {isLoading && (!entries || entries.length === 0) ? (
                                            <tr>
                                                <td colSpan={fieldList.length + 4} className="py-20">
                                                    <Loader />
                                                </td>
                                            </tr>
                                        ) : entries.length === 0 ? (
                                            <tr>
                                                <td
                                                    colSpan={fieldList.length + 4}
                                                    className="px-5 py-20 text-center"
                                                >
                                                    <div className="flex flex-col items-center gap-3">
                                                        <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center">
                                                            <FaPlus size={16} className="text-gray-500/60" />
                                                        </div>
                                                        <p className="text-gray-400 text-sm font-medium">
                                                            {filterDate
                                                                ? 'No entries found for this date'
                                                                : 'No entries yet'
                                                            }
                                                        </p>
                                                        {!filterDate && (
                                                            <button
                                                                onClick={() => setShowAddRow(true)}
                                                                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-200 cursor-pointer"
                                                            >
                                                                Add your first entry →
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : (
                                            entries.map((entry, index) => (
                                                <tr
                                                    key={entry._id}
                                                    className="group/row relative transition-all duration-300 hover:bg-indigo-500/[0.04]"
                                                    style={{ animationDelay: `${index * 30}ms` }}
                                                >
                                                    {/* Hover glow indicator */}
                                                    <td className="relative px-5 py-3.5">
                                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-0 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-full transition-all duration-300 group-hover/row:h-6 opacity-0 group-hover/row:opacity-100" />
                                                        <span className="text-xs text-gray-500 font-mono tabular-nums">
                                                            {(currentPage - 1) * ENTRIES_PER_PAGE + index + 1}
                                                        </span>
                                                    </td>
                                                    {fieldList.map((field) => {
                                                        const rawValue = entry.data?.[field.name];
                                                        const fullText = rawValue != null ? String(rawValue) : '';
                                                        const displayText = truncateText(rawValue);
                                                        const isTruncated = displayText !== fullText && displayText !== '—';
                                                        return (
                                                            <td
                                                                key={field._id}
                                                                className="px-5 py-3.5 text-sm text-gray-200 max-w-[250px]"
                                                                title={isTruncated ? fullText : undefined}
                                                            >
                                                                <span className={isTruncated ? 'cursor-help border-b border-dotted border-gray-500/50 hover:border-indigo-400/50 transition-colors duration-200' : ''}>
                                                                    {displayText}
                                                                </span>
                                                            </td>
                                                        );
                                                    })}
                                                    <td className="px-5 py-3.5">
                                                        <span className="inline-flex items-center px-2.5 py-1 text-xs font-mono text-gray-400 bg-white/[0.03] border border-white/[0.06] rounded-lg">
                                                            {entry.systemIP || '—'}
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">
                                                        {entry.createdAt
                                                            ? new Date(entry.createdAt).toLocaleString('en-US', {
                                                                month: 'short', day: 'numeric', year: 'numeric',
                                                                hour: '2-digit', minute: '2-digit',
                                                            })
                                                            : '—'}
                                                    </td>
                                                    <td className="px-5 py-3.5">
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
                                                            className="p-1.5 rounded-lg text-gray-600 opacity-0 group-hover/row:opacity-100 hover:!text-red-400 hover:bg-red-500/10 transition-all duration-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                                                        >
                                                            {deletingId === entry._id ? (
                                                                <span className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin block" />
                                                            ) : (
                                                                <FaTrash size={12} />
                                                            )}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Bottom gradient line */}
                            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                        </div>

                        {/* ── Pagination Controls ── */}
                        {totalPages > 1 && (
                            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 px-1">
                                {/* Entry count */}
                                <p className="text-sm text-gray-500">
                                    Showing{' '}
                                    <span className="text-gray-300 font-medium">{startEntry}</span>
                                    <span className="text-gray-600 mx-1">–</span>
                                    <span className="text-gray-300 font-medium">{endEntry}</span>
                                    <span className="text-gray-600 mx-1">of</span>
                                    <span className="text-indigo-400 font-medium">{totalEntries}</span>
                                </p>

                                {/* Page buttons */}
                                <div className="flex items-center gap-1 p-1 bg-white/[0.03] border border-white/[0.06] rounded-xl">
                                    <button
                                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                                        disabled={currentPage === 1}
                                        className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                                    >
                                        <FaChevronLeft size={10} />
                                    </button>

                                    {getPageNumbers()[0] > 1 && (
                                        <>
                                            <button
                                                onClick={() => handlePageChange(1)}
                                                className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                                            >
                                                1
                                            </button>
                                            {getPageNumbers()[0] > 2 && (
                                                <span className="px-0.5 text-gray-600 text-xs select-none">···</span>
                                            )}
                                        </>
                                    )}

                                    {getPageNumbers().map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`flex items-center justify-center w-8 h-8 rounded-lg text-xs font-semibold transition-all duration-250 cursor-pointer ${currentPage === page
                                                    ? 'bg-indigo-600 text-white shadow-[0_2px_12px_rgba(99,102,241,0.4)]'
                                                    : 'text-gray-500 hover:text-white hover:bg-white/[0.08]'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                                        <>
                                            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                                                <span className="px-0.5 text-gray-600 text-xs select-none">···</span>
                                            )}
                                            <button
                                                onClick={() => handlePageChange(totalPages)}
                                                className="flex items-center justify-center w-8 h-8 rounded-lg text-xs font-medium text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer"
                                            >
                                                {totalPages}
                                            </button>
                                        </>
                                    )}

                                    <button
                                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                                        disabled={currentPage === totalPages}
                                        className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all duration-200 cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                                    >
                                        <FaChevronRight size={10} />
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