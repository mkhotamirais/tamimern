import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "./components/Wrapper";
import { useBasic } from "./hooks/useBasic";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const { nav, closeNav } = useBasic();

  const onClick = () => {
    if (nav) {
      closeNav();
    }
  };

  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main onClick={onClick} className="grow">
          <Container>
            <Outlet />
          </Container>
        </main>
        <Footer />
        <ScrollRestoration />
        <Toaster richColors position="top-center" closeButton />
      </div>
    </Provider>
  );
}
