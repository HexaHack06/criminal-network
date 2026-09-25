import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { CasesPage } from './pages/CasesPage';
import { CaseDetailPage } from './pages/CaseDetailPage';
import { NetworkAnalysisPage } from './pages/NetworkAnalysisPage';
import { EntitiesPage } from './pages/EntitiesPage';
import { EntityProfilePage } from './pages/EntityProfilePage';
import { EvidencePage } from './pages/EvidencePage';
import { TimelinePage } from './pages/TimelinePage';
import { MapIntelligencePage } from './pages/MapIntelligencePage';
import { DataIngestionPage } from './pages/DataIngestionPage';
import { PatternsPage } from './pages/PatternsPage';
import { CrossCasePage } from './pages/CrossCasePage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ReportsPage } from './pages/ReportsPage';
import { AuditPage, SettingsPage } from './pages/AuditSettingsPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="cases" element={<CasesPage />} />
          <Route path="cases/:caseId" element={<CaseDetailPage />} />
          <Route path="network" element={<NetworkAnalysisPage />} />
          <Route path="entities" element={<EntitiesPage />} />
          <Route path="entities/:entityId" element={<EntityProfilePage />} />
          <Route path="evidence" element={<EvidencePage />} />
          <Route path="timeline" element={<TimelinePage />} />
          <Route path="map" element={<MapIntelligencePage />} />
          <Route path="data-ingestion" element={<DataIngestionPage />} />
          <Route path="patterns" element={<PatternsPage />} />
          <Route path="cross-case" element={<CrossCasePage />} />
          <Route path="ai-assistant" element={<AIAssistantPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="audit" element={<AuditPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
