import { useLocation } from "react-router";

const UserDashboard = () => {
    const Location = useLocation();
    return (
      <div>
        <p>Welcome {Location.state.Name}</p>
      </div>
    );
  };
  export default UserDashboard;