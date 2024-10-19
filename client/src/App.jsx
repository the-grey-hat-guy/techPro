import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import Job, { jobLoader } from "./pages/Job";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

const App = () => {
  // Add new job
  const addJob = async (newJob) => {
    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return res;
  };
  //delete job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: "DELETE",
    });
    return res;
  };
  //update Job
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(job),
    });
    return res;
  };

  const router = createBrowserRouter(
    //creating route elements
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/jobs/:id"
          element={<Job deleteJobSubmit={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="/addJob" element={<AddJob addJobSubmit={addJob} />} />
        <Route
          path="/editJob/:id"
          element={<EditJob updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
      </Route>
    )
  );

  // rendering the routes
  return <RouterProvider router={router} />;
};

export default App;
