import AdminMainLayout from "../../layouts/AdminMainLayout.tsx";
import {Outlet} from "react-router-dom";

function AdminIndex() {
    return (
        <AdminMainLayout>
            <div>
                <Outlet></Outlet>
            </div>
        </AdminMainLayout>
    );
}

export default AdminIndex;