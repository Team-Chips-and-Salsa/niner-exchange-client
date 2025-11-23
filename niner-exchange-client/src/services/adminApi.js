import { fetchWithAuth } from './auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchContentTypes() {
    return await fetchWithAuth(`${BASE_URL}/api/admin/content-types/`, {
        method: 'GET',
        mode: 'cors',
    });
}

export async function fetchReports(
    reportTypeMap,
    reportType,
    reportReason,
    reportStatus,
) {
    let endpoint = '';
    reportType = reportType.toLowerCase();
    if (reportType != 'all') {
        endpoint = `?content_type=${reportTypeMap[reportType]}&status=${reportStatus}&reason=${reportReason}`;
    } else {
        endpoint = `?status=${reportStatus}&reason=${reportReason}`;
    }
    // Gemini introduced me to the fetchWithAuth for this specific use case
    return await fetchWithAuth(`${BASE_URL}/api/admin/reports/${endpoint}`, {
        method: 'GET',
        mode: 'cors',
    });
}

export async function approveReport(report) {
    await fetchWithAuth(`${BASE_URL}/api/admin/reports/${report.id}/status/`, {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify({ status: 'APPROVED' }),
    });
}

export async function denyReport(report) {
    await fetchWithAuth(`${BASE_URL}/api/admin/reports/${report.id}/status/`, {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify({ status: 'DENIED' }),
    });
}

export async function createReport(
    content_type_map,
    content_type,
    reason,
    description,
    object_id,
) {
    content_type = content_type_map[content_type];
    const report = await fetchWithAuth(`${BASE_URL}/api/reports/create/`, {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({ content_type, reason, description, object_id }),
    });

    return report.id;
}

export async function fetchExchangeZones() {
    return await fetchWithAuth(`${BASE_URL}/api/meetup-locations/`, {
        method: 'GET',
        mode: 'cors',
    });
}

export async function createExchangeZone(data) {
    return await fetchWithAuth(
        `${BASE_URL}/api/admin/meetup-locations/create/`,
        {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data),
        },
    );
}

export async function updateExchangeZone(id, data) {
    return await fetchWithAuth(
        `${BASE_URL}/api/admin/meetup-locations/${id}/`,
        {
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(data),
        },
    );
}

export async function deleteExchangeZone(id) {
    return await fetchWithAuth(
        `${BASE_URL}/api/admin/meetup-locations/${id}/`,
        {
            method: 'DELETE',
            mode: 'cors',
        },
    );
}
