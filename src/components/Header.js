import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { Fragment, useState } from 'react';
import { Pace, WindupChildren } from 'windups';

import Button from './Button.js';
import Navbar from './Navbar.js';

const defaultImage = "https://images.unsplash.com/photo-1481142889578-dda440dacfe1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80";

export default function Header({ author, bookImage, children, image, loading }) {
  const [hasCopied, setHasCopied] = useState(false);

  const updateHasCopied = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setHasCopied(!hasCopied);
  };

  return (
    <div
      className="w-full header p-4 md:p-10 md:pl-12 pt-4"
      style={{ '--header-background': `url('${image || bookImage || defaultImage}')` }}
    >
      <div className="h-full w-full flex flex-col">
        <Navbar />
        <div className="w-full h-full flex flex-col items-center justify-end">
          {!loading && (
            <Fragment>
              <WindupChildren>
                <Pace getPace={(char) => (char === ' ' ? 40 : 20)}>
                  <div className="text-white text-md md:text-3xl mt-4 mb-2">{children}</div>
                  <div className="text-white text-xs md:text-sm mb-2">
                    <span className="font-bold">Written By:</span> {author}
                  </div>
                </Pace>
                <div className="flex mt-5">
                  <Button onClick={updateHasCopied}>
                    {hasCopied ? 'Copied': 'Share'}
                      <FontAwesomeIcon className="ml-2" icon={hasCopied ? faCheck : faCopy} />
                  </Button>
                </div>
              </WindupChildren>
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
