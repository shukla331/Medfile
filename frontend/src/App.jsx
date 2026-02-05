import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import RoleSelection from './screens/RoleSelection.jsx';
import PatientLogin from './screens/PatientLogin.jsx';
import ProviderLogin from './screens/ProviderLogin.jsx';
import PatientDashboard from './screens/PatientDashboard.jsx';
import FamilyMembers from './screens/FamilyMembers.jsx';
import AddFamilyMember from './screens/AddFamilyMember.jsx';
import UploadPrescription from './screens/UploadPrescription.jsx';
import UploadConfirmation from './screens/UploadConfirmation.jsx';
import PrescriptionStatus from './screens/PrescriptionStatus.jsx';
import PrescriptionDetails from './screens/PrescriptionDetails.jsx';
import ProviderDashboard from './screens/ProviderDashboard.jsx';
import UploadModeSelection from './screens/UploadModeSelection.jsx';
import ProviderUploadAnonymous from './screens/ProviderUploadAnonymous.jsx';
import ProviderUploadLinked from './screens/ProviderUploadLinked.jsx';
import ProviderUploadConfirmation from './screens/ProviderUploadConfirmation.jsx';
import ProcessingStatus from './screens/ProcessingStatus.jsx';
import ChoosePharmacy from './screens/ChoosePharmacy.jsx';
import PharmacyConfirmation from './screens/PharmacyConfirmation.jsx';
import NeedsClarification from './screens/NeedsClarification.jsx';
import ConsentMissing from './screens/ConsentMissing.jsx';
import ReviewWorkspace from './screens/ReviewWorkspace.jsx';

const Nav = () => (
  <nav className="card">
    <div className="card-title">Quick Navigation</div>
    <div className="grid two">
      <Link to="/">Role Selection</Link>
      <Link to="/patient/login">Patient Login</Link>
      <Link to="/provider/login">Provider Login</Link>
      <Link to="/patient/dashboard">Patient Dashboard</Link>
      <Link to="/patient/family">Family Members</Link>
      <Link to="/patient/family/add">Add Family Member</Link>
      <Link to="/patient/upload">Upload Prescription</Link>
      <Link to="/patient/upload/confirmation">Upload Confirmation</Link>
      <Link to="/patient/prescription/status">Prescription Status</Link>
      <Link to="/patient/prescription/details">Prescription Details</Link>
      <Link to="/provider/dashboard">Provider Dashboard</Link>
      <Link to="/provider/upload/mode">Upload Mode Selection</Link>
      <Link to="/provider/upload/anonymous">Provider Upload Anonymous</Link>
      <Link to="/provider/upload/linked">Provider Upload Linked</Link>
      <Link to="/provider/upload/confirmation">Provider Upload Confirmation</Link>
      <Link to="/status">Processing Status</Link>
      <Link to="/pharmacy/choose">Choose Pharmacy</Link>
      <Link to="/pharmacy/confirmation">Pharmacy Confirmation</Link>
      <Link to="/errors/needs-clarification">Needs Clarification</Link>
      <Link to="/errors/consent-missing">Consent Missing</Link>
      <Link to="/review">Review Workspace</Link>
    </div>
  </nav>
);

const App = () => (
  <Routes>
    <Route path="/" element={<RoleSelection />} />
    <Route path="/patient/login" element={<PatientLogin />} />
    <Route path="/provider/login" element={<ProviderLogin />} />
    <Route
      path="/patient/dashboard"
      element={(
        <>
          <PatientDashboard />
          <Nav />
        </>
      )}
    />
    <Route path="/patient/family" element={<FamilyMembers />} />
    <Route path="/patient/family/add" element={<AddFamilyMember />} />
    <Route path="/patient/upload" element={<UploadPrescription />} />
    <Route path="/patient/upload/confirmation" element={<UploadConfirmation />} />
    <Route path="/patient/prescription/status" element={<PrescriptionStatus />} />
    <Route path="/patient/prescription/details" element={<PrescriptionDetails />} />
    <Route path="/provider/dashboard" element={<ProviderDashboard />} />
    <Route path="/provider/upload/mode" element={<UploadModeSelection />} />
    <Route path="/provider/upload/anonymous" element={<ProviderUploadAnonymous />} />
    <Route path="/provider/upload/linked" element={<ProviderUploadLinked />} />
    <Route path="/provider/upload/confirmation" element={<ProviderUploadConfirmation />} />
    <Route path="/status" element={<ProcessingStatus />} />
    <Route path="/pharmacy/choose" element={<ChoosePharmacy />} />
    <Route path="/pharmacy/confirmation" element={<PharmacyConfirmation />} />
    <Route path="/errors/needs-clarification" element={<NeedsClarification />} />
    <Route path="/errors/consent-missing" element={<ConsentMissing />} />
    <Route path="/review" element={<ReviewWorkspace />} />
  </Routes>
);

export default App;
