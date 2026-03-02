import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArtCategoryPage from "./pages/ArtCategoryPage";
import Transmidia from "./pages/Transmidia";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cinema" element={<ArtCategoryPage />} />
          <Route path="/teatro" element={<ArtCategoryPage />} />
          <Route path="/musica" element={<ArtCategoryPage />} />
          <Route path="/fotografia" element={<ArtCategoryPage />} />
          <Route path="/pintura" element={<ArtCategoryPage />} />
          <Route path="/danca" element={<ArtCategoryPage />} />
          <Route path="/literatura" element={<ArtCategoryPage />} />
          <Route path="/escultura" element={<ArtCategoryPage />} />
          <Route path="/transmidia" element={<Transmidia />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
