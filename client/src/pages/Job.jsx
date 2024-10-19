// import { useState, useEffect } from "react";
import { useParams, useLoaderData , useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { toast } from "react-toastify";
// import Spinner from "../componets/Spinner";

const Job = ({ deleteJobSubmit }) => {
  // using useState DataLoader  functions
  const { id } = useParams();
  // const [job, setJob] = useState(null);
  // const [loading , setLoading] =  useState(true);

  // useEffect(() => {
  //   const fetchJob = async () => {
  //     try {
  //       const res = await fetch(`/api/jobs/${id}`);
  //       const data = await res.json();
  //       setJob(data);
  //     } catch (error) {
  //       console.log(" failed to fetch single job", error);
  //     }
  //     finally{
  //       setLoading(false);
  //     }
  //   };

  //   fetchJob();
  // }, []);

  // return  loading ? <Spinner/> : ( <h1>{ job.title}</h1>)

  //  accessing dataLoader
  const job = useLoaderData();
  //delete job  function
  const navigate = useNavigate();
  const OnDeleteClick = (jobId) => {
    const confirm = window.confirm("Confirm to delete Job");
    if (!confirm) return;
    deleteJobSubmit(jobId);
    navigate('/jobs');
    //toastify notification
    toast.success('Job Deleted Successfully');
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mx-2" /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title} </h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="ext-lg text-orange-700 mr-2" />
                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary}/ Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">NewTek Solutions</h2>

                <p className="my-2">
                  NewTek Solutions is a leading technology company specializing
                  in web development and digital solutions. We pride ourselves
                  on delivering high-quality products and services to our
                  clients while fostering a collaborative and innovative work
                  environment.
                </p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  contact@newteksolutions.com
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">555-555-5555</p>
              </div>
              {/* 
            <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/editJob/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => OnDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
// using React Route  Dataloader  function
const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);
  const data = await res.json();
  return data;
};

export { Job as default, jobLoader };
