import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboards from '../components/admin/Dashboard/Dashboards';
import Sidebar from '../components/layouts/Sidebar';
import Header from '../components/layouts/Header';
import Adduser from '../components/admin/User/Adduser';
import Clientservice from '../components/admin/User/Clientservice';
import Tradehistory from '../components/admin/TradeHistory/Tradehistory';
import Allscript from '../components/admin/AdminScript/AllScript';
import Clientactivity from '../components/admin/User/Clientactivity';
import Clientreport from '../components/admin/User/Clientreport';
import Smtp from '../components/admin/Smtp/Smtp';
import UserLogs from '../components/admin/User/UserLogs';
import StrategyGroup from '../components/admin/Groups/StrategyGroup';
import ServiceReport from '../components/admin/User/ServiceReport';
import AddscriptScalping from '../components/admin/AdminScript/Addscript.Scalping';
import AddScriptOption from '../components/admin/AdminScript/AddScript.Option'
import PatternScript from '../components/admin/AdminScript/AddScript.Pattern'
import System from '../components/admin/System/System';
import AllPlan from '../components/admin/Plan/AllPlan';
import CPP from '../components/user/Patterns/CPP';
import AddPlan from '../components/admin/Plan/AddPlan';
import TransectionRequest from '../components/admin/Requests/TransectionRequests';




const AdminRoute = () => {


  return (
    <>
      <div className='wrapper'>
        <Sidebar />
        <div id="content-page" className="content-page">
          <Header />
          <Routes>
            <Route path="/dashboard" element={<Dashboards />} />
            <Route path="/adduser" element={<Adduser />} />
            <Route path="/clientservice" element={<Clientservice />} />
            <Route path="/tradehistory" element={<Tradehistory />} />
            <Route path="/allscript" element={<Allscript />} />
            <Route path="/addscript/scalping" element={<AddscriptScalping />} />
            <Route path="/addscript/pattern" element={<PatternScript />} />
            <Route path="/clientactivity" element={<Clientactivity />} />
            <Route path="/clientreport" element={<Clientreport />} />
            <Route path="/smtp" element={<Smtp />} />
            <Route path="/userlogs" element={<UserLogs />} />
            <Route path="/strategygroup" element={<StrategyGroup />} />
            <Route path="/servicerepor" element={<ServiceReport />} />
            <Route path="/addscript/option" element={<AddScriptOption />} />
            <Route path="/addscript/option" element={<AddScriptOption />} />
            <Route path="/system" element={<System />} /> 
            <Route path="/allplan" element={<AllPlan />} />  
            <Route path="/cpp" element={<CPP />} />
            <Route path="/addplan" element={<AddPlan />} />
            <Route path="/transectionrequest" element={<TransectionRequest />} />
             
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminRoute;
