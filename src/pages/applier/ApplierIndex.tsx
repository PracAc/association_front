import {Outlet} from "react-router-dom";
import AdminMainLayout from "../../layouts/AdminMainLayout.tsx";


function ApplierIndex() {
    return (
        <AdminMainLayout>
            <div>
                <Outlet></Outlet>
            </div>
        </AdminMainLayout>
    );
}

export default ApplierIndex;