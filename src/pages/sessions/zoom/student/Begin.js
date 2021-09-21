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
      
        
        {defaultLayout &&
        <>
        <div className='row'>
          <div className='pb-2 col-md-6 mt-3 mb-2'>
            <Zoom roomZoom={roomZoom} />
          </div>
          <div id="begin-jitsi" className='pb-2 col-md-6 mt-3 mb-2'>        
          </div>
        </div>
        </>
        }
        
        {jitsiLayout &&
        <>
        <div className='row col-md-12'>
          <div id="begin-jitsi"  className='pb-3 mt-2 col-md-12' style={{ height: '580px' }}/>                  
        </div>
        </>        
        }
        
        {zoomLayout &&
          <>
          <div className='row'>
            <div className='pb-2 col-md-12 mt-3 mb-2'>
              <Zoom roomZoom={roomZoom} />
            </div>            
          </div>
          </>
          }
              
    </React.Fragment>
  );
};

export default Begin;
