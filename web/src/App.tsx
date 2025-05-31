import Layout from "./layouts";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  return (
    <ThemeProvider>
      <Layout>
        <h1>Hello</h1>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
