import Controller from "sap/ui/core/mvc/Controller";
import Input from "sap/m/Input";
import Text from "sap/m/Text";
import MessageToast from "sap/m/MessageToast";
import { ApiService } from "../service/ApiService";

export default class Main extends Controller {
    private apiService!: ApiService;

    public onInit(): void {
        // this.apiService = new ApiService("./api/echo"); // works with direct access but not with BWZ
        this.apiService = new ApiService("api/echo"); // works with direct access but not with BWZ
        // this.apiService = new ApiService("/api/echo"); // doesn't work with both

        // Dynamically get the app's root path and append the API route: 
        // Error 500
        // Do not use static URLs!
        // const sAppRoot = sap.ui.require.toUrl("guardengine");
        // this.apiService = new ApiService(`${sAppRoot}/api/echo`);

        // USE THE DEFAULT
    }

    public async onSendPress(): Promise<void> {
        const inputControl = this.byId("inputText") as Input;
        const resultControl = this.byId("resultText") as Text;
        const textValue = inputControl.getValue();

        if (!textValue) {
            MessageToast.show("Please enter text.");
            return;
        }

        try {
            const data = await this.apiService.sendText(textValue);
            resultControl.setText(data.result);
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            resultControl.setText(`Error: ${errorMessage}`);
        }
    }
}