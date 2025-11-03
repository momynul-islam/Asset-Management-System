import UserTable from "../features/users/UserTable";
import { useUsers } from "../features/users/useUsers";

function Users() {
  const { users, isLoading, isError } = useUsers();

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 text-gray-100">Users</h1>
      <UserTable users={users} isLoading={isLoading} isError={isError} />
    </>
  );
}

export default Users;
