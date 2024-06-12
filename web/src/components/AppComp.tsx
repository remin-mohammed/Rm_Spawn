import {
  Box,
  Button,
  Flex,
  Text,
  createStyles,
  
} from "@mantine/core";
import { 
  useState,
  useEffect 
} from "react";
import { 
  fetchNui 
} from "../utils/fetchNui";
import { 
  IconCaretLeft,IconCaretRight 
} from "@tabler/icons-react";


const useStyles = createStyles((theme) => ({
 
  center: {
    borderRadius: 10,
    position: "fixed",
    top: "50%",
    left: "50%",
  },

  
}));

export default function AppComp() {
  const { classes } = useStyles();
  const [locations, setLocations] = useState([]);
  const [locationIndex, setLocationIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [buttonStyles, setButtonStyles] = useState({
    primaryColor: "",
    primaryShade: "",
    buttonColor: "",
    borderColor: "",
  });

  useEffect(() => {
    fetchNui("getLocationsData")
      .then((data) => {
    
       const flatLocations = data.flat(2);
        setLocations(flatLocations);
  
      })
      .catch((error) => {
        console.error("Error fetching locations data:", error);
      });

      fetchNui("getConfig")
      .then((config) => {
        setButtonStyles({
          primaryColor: config.primaryColor,
          primaryShade: config.primaryShade,
          buttonColor: config.buttoncolor,
          borderColor: config.bordercolor,

        });
        console.log(config.buttoncolor);
      })
      .catch((error) => {
        console.error("Error fetching color config:", error);
      });
    }, 
    
    
    []);

  const handleNextLocation = () => {
    if (locations.length === 0) {
      console.log('No locations available');
      return;
    }

    const nextIndex = (locationIndex + 1) % locations.length;
    const currentLocation = locations[nextIndex];

    console.log('Current Location:', currentLocation);

    setSelectedLocation(currentLocation); // Set the selected location

    fetchNui("precb", currentLocation) // Trigger client event with the current location
      .then(() => {
        
      })
     

    setLocationIndex(nextIndex);
  };

  const handlePreviousLocation = () => {
    if (locations.length === 0) {
      console.log('No locations available');
      return;
    }

    const nextIndex = (locationIndex - 1 + locations.length) % locations.length;
    const currentLocation = locations[nextIndex];

    

    setSelectedLocation(currentLocation); // Set the selected location

    fetchNui("precb", currentLocation) // Trigger client event with the current location
      .then(() => {
        console.log('Event triggered with location:', currentLocation);
      })
      

    setLocationIndex(nextIndex);
  };


  const handleReset = () => {

    const currentLocation = locations[locationIndex];

    setSelectedLocation(currentLocation); // Set the selected location
    
    fetchNui("nuicb", currentLocation) // Trigger client event with the current location
    handleClose()
    
  };


  function handleClose() {
    fetchNui("hide-ui");
  }

  return (
    
    <Box className={classes.center}>
      <Box bg={"#1A47464b"} w={380} pos={"absolute"} top={250} left={-200} h={100} sx={{ border: "1px solid #1A47464b", borderRadius: "10px" }}>
      <Text ta='center' c='white' size='xl' px={5} sx={{ borderRadius: 5 }} fw={700} fz='xl'>
              { locations[locationIndex]}
        
            </Text>
      </Box>
      
 <Box  w={380} pos={"absolute"} top={400} left={-200} h={50} sx={{ borderRadius: "50px" }}>
          <Flex justify="space-between" align="center" h="100%">
            <Button onClick={handlePreviousLocation} size="xs"><IconCaretLeft /></Button>
            <Button onClick={handleReset} style={{ color: '#b93751', backgroundColor:"#1A47464b", border:"1px solid red"}}>Spawn Here</Button>
            <Button onClick={handleNextLocation} size="xs"><IconCaretRight /></Button>
          </Flex>
        </Box>
        <Button onClick={handleReset} style={{ color: 'white', position:"absolute", top:480, left:-200, width:380, height:50, backgroundColor:buttonStyles.buttonColor}}>🗺️ Last Location</Button>
        </Box>
  );
}



