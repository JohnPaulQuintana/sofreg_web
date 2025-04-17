import React, { useEffect, useRef, useState } from "react";
import { jobListings } from "../../data/job_listing";
import imagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";
import { formatDistanceToNow } from 'date-fns';
import axios from "axios"; 

const SectionContent = ({openModal}) => {
    const galleryRef = useRef(null); // Ref for the gallery container
    const [isotopeInstance, setIsotopeInstance] = useState(null); // Store the Isotope instance
    const [activeFilter, setActiveFilter] = useState("*"); // Track active filter
    const [jobs, setJobData] = useState(null);

    useEffect(() => {
        const fetchJobData = async () => {
            try {
                const jobApi = `${import.meta.env.VITE_API_URL}/career/jobs`;

                console.log('Fetching initial jobs data...');
                const responsejobs = await axios.get(jobApi);
                console.log('Initial jobs data:', responsejobs.data.jobs);
                // setEmployeeData(response.data);
                setJobData(responsejobs?.data?.jobs)
            } catch (error) {
                console.error(`Failed to fetch data:`, error.responsejobs?.data || error.message);
            }
        };
        fetchJobData();
    }, []);
    // console.log(jobs)
    useEffect(() => {
        if (galleryRef.current && jobs && !isotopeInstance) {
            // Initialize Isotope only if the galleryRef is ready
            const instance = new Isotope(galleryRef.current, {
                itemSelector: ".items", // Class for items in the gallery
                layoutMode: "fitRows",        // Use the fitRows layout mode
                percentPosition: true,  // Ensures that items are correctly positioned relative to their parent
            });

            setIsotopeInstance(instance);
            // Wait for images to load before layout
            imagesLoaded(galleryRef.current, () => {
                console.log("Images loaded, applying layout...");
                // Only arrange and layout after the isotopeInstance is properly set
                if (isotopeInstance) {
                    isotopeInstance.arrange();  // Apply the filter and arrange the items
                    isotopeInstance.layout();   // Recalculate the layout
                }
            });


            return () => {
                if (isotopeInstance) {
                    isotopeInstance.destroy();
                }
            };
        }
    }, [galleryRef, isotopeInstance, jobs]);

    useEffect(() => {
        if (isotopeInstance) {
          
          let filter = "*"; // Default to show all items
    
          if (activeFilter !== "*") {
            // If category is specified but subcategory is "*", filter by category only
            filter = `.${activeFilter}`;
          } 
    
          isotopeInstance.arrange({ filter });
          // Force re-layout after applying filters
          imagesLoaded(galleryRef.current, () => {
            isotopeInstance.layout();
          });
        }
      }, [activeFilter, isotopeInstance, jobs]);
    
      const handleFilterClick = (filterValue) => {
        console.log(filterValue)
        // setHoveredFilter(filterValue);
        setActiveFilter(filterValue); // Update the active filter
    
      };

    return (
        <section className="work-stand section-padding sub-bg desktop:px-40">
            <div className="container-xxl">
                <div className="row">
                    {/* filter links */}
                    <div className="filtering col-12 text-center">

                        <div className="filter mb-4">
                            <span className="text">Filter By :</span>
                            <span data-filter="*" className={activeFilter === "*" ? "active" : ""}
                                onClick={() => handleFilterClick("*")}
                            >
                                Show All
                            </span>

                            {jobs?.map((job, index) => (
                                <span className={activeFilter === `${job?.code}` ? "active" : ""} key={index} data-filter={`${job?.code}`} onClick={() => handleFilterClick(job?.code)}>
                                    {job?.title}
                                </span>
                            ))}

                        </div>

                    </div>
                </div>
                <span className="block mb-4 text-xl">We're excited to announce that Sofreg Solutions is expanding our dynamic team! We’re on the lookout for talented professionals to fill the following positions:</span>

                <div className="gallery row stand-marg" ref={galleryRef}>
                    {jobs?.map((job, index) => (
                        <div key={index} className={`col-lg-6 col-md-6 transition-transform transform scale-100 hover:scale-110 duration-300 items ${job?.code}`}>
                            {/* <img src="/assets/PNG/LOGO_WHITE.png" className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 p-2 rounded-md bg-color-primary-blue" alt="logo" /> */}
                            <div className="item mb-40 bg-[#181616] rounded-sm h-[220px]">
                                <div className="h-full flex items-center"> {/* Changed to justify-start */}
                                    <a className="img ps-3 mobile:ps-0 flex items-center justify-center gap-4 cursor-pointer w-full"> {/* Added w-full for flex container */}
                                        {/* Icon with flex-shrink-0 to avoid shrinking */}
                                        <img src="/assets/PNG/LOGO_WHITE.png" className="w-14 mobile:w-20 p-2 rounded-md bg-color-primary-blue" alt="logo" />

                                        {/* Text container that can wrap and grow */}
                                        <div className="w-fit">
                                            <span className="text-2xl font-bold block">{job?.title}</span> {/* block for text to properly wrap */}
                                            <span className="text-sm">{job?.address}</span>
                                            <span className={`block text-xs ${job?.status === 'open' ? 'text-green-500' : 'text-red-500'}`}>
                                                • {job?.status === 'open' ? 'Open for application.' : 'No longer accepting applicants.'}
                                            </span>

                                            <span className="block text-xs text-gray-500">• {formatDistanceToNow(new Date(job?.date_posted), { addSuffix: true })}</span>
                                            <div className="flex items-center gap-2 text-sm mt-2">
                                                <span className={`px-1 rounded-sm ${job?.status != 'open' ? 'text-red-500' : 'text-green-600'}`}>{job?.status}</span>
                                                <span className="px-1 rounded-sm text-xs">Full-Time (WFH)</span>
                                                <span  
                                                    onClick={() => openModal(job)}
                                                    className="flex-1 px-1 rounded-sm text-color-primary-blue">more <span className="icon ti-arrow-top-right text-sm"></span></span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



            </div>



        </section>
    )
}

export default SectionContent