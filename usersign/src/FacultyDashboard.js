import { useLocation } from "react-router";

const FacultyDashboard = () => {
    const Location = useLocation();
    return (
      <div>
        <p>Welcome {Location.state.Name}</p>
      </div>
    );
  };
  export default FacultyDashboard;