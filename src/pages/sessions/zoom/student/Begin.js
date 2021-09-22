import React, {useEffect,useState} from 'react';
import Zoom from '../../../../components/Zoom';
import handleJitsiResize from '../../handleJitsiResize';
import { registerEvent, clientEvents, connect } from '../../../../utils/socketManager';

const Begin = ({roomZoom, onJitsiLayout, roomJitsi }) => {    

  const [jitsiLayout, setJitsiLayout] = useState();
  const [zoomLayout, setZoomLayout] = useState();
  const [defaultLayout, setDefaultLayout] = useState(true);

  useEffect(() => {        
    connect(roomJitsi);
    registerEvent((layout) => {        
        switch(layout){
          case 0:
            setJitsiLayout(false);
            setZoomLayout(false);          
            setDefaultLayout(true);
            handleJitsiResize("#begin-jitsi", onJitsiLayout);
            break;
          case 1:
            setZoomLayout(false);
            setJitsiLayout(true);
            setDefaultLayout(false);
            handleJitsiResize("#begin-jitsi", onJitsiLayout);
            break;
          case 2:
            setDefaultLayout(false);
            setZoomLayout(true);
            setJitsiLayout(false);            
            handleJitsiResize("#begin-jitsi", onJitsiLayout);
            break;
          default:
        }
      }, clientEvents.inclusionLayout);    
    
    const listener = window.addEventListener('resize', () => handleJitsiResize("#begin-jitsi", onJitsiLayout));    
    return () => window.removeEventListener('resize', listener);  
  }, []);

  useEffect(() => {      
    handleJitsiResize("#begin-jitsi", onJitsiLayout);
    }
  ,[jitsiLayout,zoomLayout,defaultLayout]);



  return (
    <React.Fragment>
      
        
        {defaultLayout &&
        <>
        <div className='row'>
          <div className='pb-2 col-md-6 mt-3 mb-2'>
            <Zoom roomZoom={roomZoom} height={"580px"} width={"620px"}/>
          </div>
          <div id="begin-jitsi" className='pb-2 col-md-6 mt-3 mb-2' style={{ height: '580px' }}>        
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
            <div className='container'>
              <Zoom roomZoom={roomZoom} height={"600px"} width={"1000px"} />
            </div>            
          </div>
          <div>
          <div id="begin-jitsi"  style={{ height: '0px' }}/>          
          </div>
          </>
          }
              
    </React.Fragment>
  );
};

export default Begin;
