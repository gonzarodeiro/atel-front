import React, {useEffect} from 'react';
import Zoom from '../../../../components/Zoom';
import handleJitsiResize from '../../handleJitsiResize';

const Begin = ({roomZoom, onJitsiLayout, jitsiLayout, defaultLayout, zoomLayout }) => {    

  useEffect(() => {        
    handleJitsiResize("#begin-jitsi", onJitsiLayout);
    const listener = window.addEventListener('resize', () => handleJitsiResize("#begin-jitsi", onJitsiLayout));    
    return () => window.removeEventListener('resize', listener);  
  }, []);



  return (
    <React.Fragment>
      <div className='row'>
        
        {defaultLayout &&
        <>
          <div className='pb-2 col-md-6 mt-3 mb-2'>
            <Zoom roomZoom={roomZoom} />
          </div>
          <div id="begin-jitsi" className='pb-2 col-md-6 mt-3 mb-2'>        
          </div>
        </>
        }
        
        {jitsiLayout &&
        <>          
          <div id="begin-jitsi" className='pb-2 col-md-12 mt-3 mb-2'>        
          </div>
        </>
        }
        
        {zoomLayout &&
          <>
            <div className='pb-2 col-md-12 mt-3 mb-2'>
              <Zoom roomZoom={roomZoom} />
            </div>            
          </>
          }
        
      </div>      
    </React.Fragment>
  );
};

export default Begin;
