import { useEffect, useState } from 'react';
import {
    fetchContentTypes,
    fetchReports,
    fetchExchangeZones,
    approveReport,
    denyReport,
    createExchangeZone,
    updateExchangeZone,
    deleteExchangeZone,
} from '../services/adminApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessDenied from '../components/admin/AccessDenied';
import AdminFilters from '../components/admin/AdminFilters';
import ReportsList from '../components/admin/ReportsList';
import ReportDetailsModal from '../components/admin/ReportDetailsModal';
import ExchangeZonesModal from '../components/admin/ExchangeZonesModal';

export default function AdminPage() {
    const [contentTypes, setContentTypes] = useState([]);
    const [contentTypeMap, setContentTypeMap] = useState({});
    const [contentTypeMapReversed, setContentTypeMapReversed] = useState({});
    const [reports, setReports] = useState([]);
    const [zones, setZones] = useState([]);
    const [selectedType, setSelectedType] = useState('ALL');
    const [selectedStatus, setSelectedStatus] = useState('ALL');
    const [selectedReason, setSelectedReason] = useState('ALL');
    const [selectedReport, setSelectedReport] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showZonesModal, setShowZonesModal] = useState(false);
    const [selectedZoneId, setSelectedZoneId] = useState('');
    const [contentTypesLoaded, setContentTypesLoaded] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') return;

        fetchContentTypes()
            .then((data) => {
                setContentTypes(data);

                const newMap = {};
                for (let i = 0; i < data.length; i++) {
                    newMap[data[i].model] = data[i].id;
                }

                setContentTypeMap(newMap);

                const newMapReversed = {};
                for (let i = 0; i < data.length; i++) {
                    newMapReversed[data[i].id] = data[i].model;
                }

                setContentTypeMapReversed(newMapReversed);
            })
            .finally(() => {
                setContentTypesLoaded(true);
            });

        refreshZones();
    }, [currentUser, currentUser?.id]);

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'admin') return;
        if (!contentTypesLoaded) return;

        fetchReports(
            contentTypeMap,
            selectedType,
            selectedReason,
            selectedStatus,
        ).then((data) => {
            setReports(data);
        });
    }, [
        selectedType,
        selectedReason,
        selectedStatus,
        currentUser,
        currentUser?.id,
        contentTypeMap,
        contentTypesLoaded,
    ]);

    if (!currentUser || currentUser.role !== 'admin') {
        return <AccessDenied />;
    }

    const refreshZones = () => {
        fetchExchangeZones().then((data) => {
            setZones(data);
        });
    };

    const handleApproval = async (report) => {
        await approveReport(report);
        setReports(reports.filter((r) => r.object_id != report.object_id));
        setShowModal(false);
        setSelectedReport(null);
    };

    const handleDenial = async (report) => {
        await denyReport(report);
        setReports(reports.filter((r) => r.id != report.id));
        setShowModal(false);
        setSelectedReport(null);
    };

    // TODO: Fix user not showing up
    function getReportLabel(report) {
        if (!report.content_object) {
            return 'Content Deleted';
        }
        switch (contentTypeMapReversed[report.content_type]) {
            case 'listing':
                return report.content_object.title;
            case 'customuser':
                return report.content_object.first_name + " " + report.content_object.last_name;
            case 'review':
                return report.content_object.comment;
            default:
                return 'UNKNOWN REPORT TYPE';
        }
    }

    function getObjectPath(report) {
        switch (contentTypeMapReversed[report.content_type]) {
            case 'listing':
                return '/listing/';
            case 'customuser':
                return '/profile/';
            case 'review':
                return '/profile/';
            default:
                return 'UNKNOWN REPORT TYPE';
        }
    }

    function openReportModal(report) {
        setSelectedReport(report);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        setSelectedReport(null);
    }

    function getItemDescription(report) {
        if (!report.content_object) {
            return 'Content has been deleted';
        }
        switch (contentTypeMapReversed[report.content_type]) {
            case 'listing':
                return (
                    report.content_object.description ||
                    'No description available'
                );
            case 'customuser':
                return report.content_object.bio || 'No bio available';
            case 'review':
                return report.content_object.comment || 'No comment available';
            default:
                return 'No description available';
        }
    }

    function openZonesModal() {
        setShowZonesModal(true);
    }

    function closeZonesModal() {
        setShowZonesModal(false);
        setSelectedZoneId('');
    }

    const handleCreateZone = async (data) => {
        await createExchangeZone(data);
        refreshZones();
    };

    const handleUpdateZone = async (id, data) => {
        await updateExchangeZone(id, data);
        refreshZones();
    };

    const handleDeleteZone = async (id) => {
        await deleteExchangeZone(id);
        refreshZones();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
            <main className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Admin Portal
                    </h1>
                    <p className="text-gray-600">
                        Manage reports and content moderation
                    </p>
                </div>

                <AdminFilters
                    selectedType={selectedType}
                    setSelectedType={setSelectedType}
                    selectedReason={selectedReason}
                    setSelectedReason={setSelectedReason}
                    selectedStatus={selectedStatus}
                    setSelectedStatus={setSelectedStatus}
                    openZonesModal={openZonesModal}
                />

                <ReportsList
                    reports={reports}
                    selectedType={selectedType}
                    openReportModal={openReportModal}
                    getObjectPath={getObjectPath}
                    getReportLabel={getReportLabel}
                    navigate={navigate}
                />
            </main>

            {showModal && selectedReport && (
                <ReportDetailsModal
                    selectedReport={selectedReport}
                    closeModal={closeModal}
                    getReportLabel={getReportLabel}
                    getItemDescription={getItemDescription}
                    handleApproval={handleApproval}
                    handleDenial={handleDenial}
                />
            )}

            {showZonesModal && (
                <ExchangeZonesModal
                    zones={zones}
                    selectedZoneId={selectedZoneId}
                    setSelectedZoneId={setSelectedZoneId}
                    closeZonesModal={closeZonesModal}
                    handleCreateZone={handleCreateZone}
                    handleUpdateZone={handleUpdateZone}
                    handleDeleteZone={handleDeleteZone}
                />
            )}
        </div>
    );
}
