import {createBrowserRouter} from "react-router-dom";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.tsx";
import LoginPage from "../pages/LoginPage/LoginPage.tsx";
import RequireAuth from "../auth/RequireAuth.tsx";
import HomePage from "../pages/HomePage/HomePage.tsx";
import RouterPage from "../pages/Router/RouterPage.tsx";
import SelectRoom from "../pages/Rooms/SelectRoom/SelectRoom.tsx";
import Room from "../pages/Rooms/Room/Room.tsx";
import DeviceAddPage from "../pages/Devices/DeviceAddPage/DeviceAddPage.tsx";
import DevicesPage from "../pages/Devices/DevicesPage/DevicesPage.tsx";
import DevicePage from "../pages/Devices/DevicePage/DevicePage.tsx";
import SelectCameraPage from "../pages/Camera/SelectCameraPage/SelectCameraPage.tsx";
import SettingsPage from "../pages/Settings/SettingsPage/SettingsPage.tsx";
import SettingsDevice from "../pages/Settings/SettingsDevice/SettingsDevice.tsx";
import SettingsRoom from "../pages/Settings/SettingsRoom/SettingsRoom.tsx";
import AddCameraPage from "../pages/Camera/AddCameraPage/AddCameraPage.tsx";
import SettingsCamera from "../pages/Settings/SettingsCamera/SettingsCamera.tsx";
import DeviceAddPeripheral from "../pages/Devices/DeviceAddPeripheral/DeviceAddPeripheral.tsx";
import DeviceEditPeripheral from "../pages/Devices/DeviceEditPeripheral/DeviceEditPeripheral.tsx";

export default createBrowserRouter([
    {
        path: "/login/",
        element: <LoginPage />,
    },
    {
        path: "/registration/",
        element: <RegistrationPage />,
    },
    {
        path: "/",
        element: <RequireAuth></RequireAuth>,
        children: [
            { path: "", element: <HomePage /> },
            { path: "/router/", element: <RouterPage /> },
            { path: "rooms/", element: <SelectRoom /> },
            { path: "rooms/:id/", element: <Room /> },
            { path: "rooms/:id/add/", element: <DeviceAddPage /> },
            { path: "rooms/:id/settings/", element: <SettingsRoom /> },
            { path: "devices/", element: <DevicesPage /> },
            { path: "devices/:id", element: <DevicePage /> },
            { path: "devices/:id/settings/", element: <SettingsDevice /> },
            { path: "devices/:id/peripheral/edit/",element:<DeviceEditPeripheral/>},
            { path: "devices/:id/peripheral/add/",element:<DeviceAddPeripheral/>},
            { path: "camera/",element:<SelectCameraPage/> },
            { path: "camera/add/", element:<AddCameraPage/> },
            { path: "camera/settings/:id", element:<SettingsCamera/> },
            { path: "settings/", element: <SettingsPage /> },
        ],
    },
]);