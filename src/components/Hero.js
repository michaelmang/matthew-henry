import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { Pace, WindupChildren } from 'windups';

import Navbar from "./Navbar.js";

const defaultImage =
  "http://digitalpuritan.net/wp-content/uploads/2014/06/Matthew-Henry-745x1024.jpg";

export default function Hero({ loading }) {
  return (
    <div
      className="w-full hero p-4 md:p-10 md:pl-12 pt-4"
      style={{ "--hero-background": `url('${defaultImage}')` }}
    >
      <div className="h-full w-full flex flex-col justify-between">
        <Navbar />
        <div className="flex flex-col items-start justify-end pt-6">
          {!loading && (
            <Fragment>
              <div className="text-white text-md md:text-4xl mb-2">
                Matthew Henry's Bible Commentary
              </div>
              <div className="text-sm md:text-lg mb-4 font-bold text-gray-400">
                1706 - 1714
              </div>
              <div className="flex flex-col border-white border-l-2 border-solid pr-8 text-white text-xs md:text-base w-3/4 md:w-5/12">
                <WindupChildren>
                  <Pace getPace={(char) => (char === ' ' ? 35 : 20)}>
                    <div className="ml-4 text-left">
                      It is an excellency, in this commentary, that the truths of
                      Scripture are adapted, with great spiritual skill, to the
                      various afflictions, conflicts, and temptations which are
                      incident to the Christian life. The erring will here find
                      reproof and direction, the sluggish excitement, the timid
                      encouragement, the mourner comfort, and the growing Christian,
                      confirmation, and increase of knowledge and assurance.
                    </div>
                    <div className="ml-4 mt-4">
                      - Archibald Alexander (1828)
                    </div>
                  </Pace>
                </WindupChildren>
              </div>
              <div className="flex my-5">
                <FontAwesomeIcon
                  className="text-white animate-bounce"
                  icon={faArrowDown}
                />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
