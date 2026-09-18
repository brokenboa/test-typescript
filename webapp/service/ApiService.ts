export interface ApiResponse {
    result: string;
}

export class ApiService {
    private readonly endpointUrl: string;

    constructor(endpointUrl: string = "/api/echo") {
        this.endpointUrl = endpointUrl;
    }

    public async sendText(text: string): Promise<ApiResponse> {

        const targetUrl = this.endpointUrl; // e.g., "/api/echo"
        const payload = { text: text };

        // --- DEBUG: Before sending ---
        console.log("[API DEBUG] Sending Request:", {
            url: targetUrl,
            method: "POST",
            payload: payload,
            timestamp: new Date().toISOString()
        });
        try {

            
            const response = await fetch(this.endpointUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": "Fetch" // New: This header is used to fetch a CSRF token from the server
                },
                body: JSON.stringify({ text })
            });

            // --- DEBUG: After receiving (Status) ---
            console.log("[API DEBUG] Response Status:", response.status, response.statusText);
            if (!response.ok) {
                throw new Error(`Server returned HTTP ${response.status}`);
            }

            const data = await response.json();

            // --- DEBUG: Successful Response Data ---
            console.log("[API DEBUG] Response Data Received:", data);
            return data;
            
        } catch (error) {
            console.error("[API DEBUG] Fetch Exception Caught:", error);
            throw error;
        }
    }
}