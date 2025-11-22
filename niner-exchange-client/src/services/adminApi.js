import { fetchWithAuth } from "./auth";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchContentTypes() {
    return await fetchWithAuth(`${BASE_URL}/api/admin/content-types/`, {
        method: 'GET',
        mode: 'cors',
    });
}

export async function fetchReports(reportTypeMap, reportType, reportReason, reportStatus) {
    let endpoint = ''
    reportType = reportType.toLowerCase()
    if (reportType != "all") {
        endpoint = `?content_type=${reportTypeMap[reportType]}&status=${reportStatus}&reason=${reportReason}`
    }
    else {
        endpoint = `?status=${reportStatus}&reason=${reportReason}`
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
        body: JSON.stringify({"status": "APPROVED"}),
    });
}

export async function denyReport(report) {
    await fetchWithAuth(`${BASE_URL}/api/admin/reports/${report.id}/status/`, {
        method: 'PATCH',
        mode: 'cors',
        body: JSON.stringify({"status": "DENIED"}),
    });
}

export async function createReport(content_type_map, content_type, reason, object_id) {
    const token = localStorage.getItem('django_access_token');

    if (!token) {
        throw new Error("Unauthorized");
    }
    content_type = content_type_map[content_type]
    const response = await fetch(`${BASE_URL}/api/reports/create/`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({content_type, reason, object_id}),
    })

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const report = await response.json();
    return report.id;
}


export async function fetchExchangeZones() {
    return await fetchWithAuth(`${BASE_URL}/api/admin/exchange-zones/`, {
        method: 'GET',
        mode: 'cors',
    });
}