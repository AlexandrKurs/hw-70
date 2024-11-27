import {Route, Routes} from "react-router-dom";
import Layout from "./components/UI/Layout.tsx";
import Home from "./containers/Home/Home.tsx";
import NewContact from "./containers/NewContact/NewContact.tsx";
import EditContact from "./containers/EditContacts/EditContacts.tsx";



const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/new-contact" element={<NewContact/>} />
                    <Route path="/edit-contact/:id" element={<EditContact/>} />
                </Routes>
            </Layout>
        </>
    )
};

export default App