import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Animals from "./pages/Animals";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";
import { AppLayout } from "./components/layout/AppLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/install" element={<Install />} />
          <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/animals" element={<AppLayout><Animals /></AppLayout>} />
          <Route path="/movements" element={<AppLayout><div className="text-center py-12 text-muted-foreground">Em desenvolvimento</div></AppLayout>} />
          <Route path="/tasks" element={<AppLayout><div className="text-center py-12 text-muted-foreground">Em desenvolvimento</div></AppLayout>} />
          <Route path="/settings" element={<AppLayout><div className="text-center py-12 text-muted-foreground">Em desenvolvimento</div></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
