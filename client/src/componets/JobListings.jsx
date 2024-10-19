//import jobs from "../jobs.json";
import { useState, useEffect } from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
const JobListings = ({ isHome = false }) => {
  // const jobListings = isHome ?  jobs.slice(0,3) : jobs;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  //useEffectchanges are made when the data loads , we pass an error , we set the loader
  useEffect(() => {
    const fetchJobs = async () => {
     const apiData = isHome ? '/api/jobs?_limit=3': '/api/jobs';
      try {
        const res = await fetch(apiData);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.log("Failed to fetch data", error);
      } finally {
        setLoading();
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Browse Jobs" : "All Jobs"}
        </h2>
        
          {/* loader  */}
          {loading ? (
            <Spinner loading = {loading} />
          ) : (
            <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} />
                
              ))}
              </div>
            </>
          )}
 
      </div>
    </section>
  );
};

export default JobListings;
