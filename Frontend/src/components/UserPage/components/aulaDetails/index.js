import AulasDetails from "./aulaDetails";
import { useParams } from "react-router-dom";

function App() {
  const { aulaId } = useParams();
  return (
    <div>
      <main>
        <AulasDetails aulaId={aulaId} />
      </main>
    </div>
  );
}

export default App;
