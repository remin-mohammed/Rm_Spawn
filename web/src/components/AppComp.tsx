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
  left: {
    borderRadius: 10,
    position: "fixed",
    top: "0%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  center: {
    borderRadius: 10,
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  bot: {
    borderRadius: 10,
    position: "absolute",
    justifyContent: "center",
    bottom: "30%",
    left: "5%",
    width:"4100",
  },
  
}));

export default function AppComp() {
  const { classes } = useStyles();
  const [locations, setLocations] = useState([]);
  const [locationIndex, setLocationIndex] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    fetchNui("getLocationsData")
      .then((data) => {
    
       const flatLocations = data.flat(2);
        setLocations(flatLocations);
  
      })
  }, []);

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
        console.log('Event triggered with location:', currentLocation);
      })
      .catch((error) => {
        console.error('Error triggering event:', error);
      });

    setLocationIndex(nextIndex);
  };

  const handlePreviousLocation = () => {
    if (locations.length === 0) {
      console.log('No locations available');
      return;
    }

    const nextIndex = (locationIndex - 1 + locations.length) % locations.length;
    const currentLocation = locations[nextIndex];

    console.log('Current Location:', currentLocation);

    setSelectedLocation(currentLocation); // Set the selected location

    fetchNui("precb", currentLocation) // Trigger client event with the current location
      .then(() => {
        console.log('Event triggered with location:', currentLocation);
      })
      .catch((error) => {
        console.error('Error triggering event:', error);
      });

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
 /*   <Box className={classes.left} py={10} h={10000} w={530} bg={'linear-gradient(to right, #1A1A1A, rgba(0, 0, 0, 0))'} mx='auto'>
      <Box className={classes.center} py={10} h={1500} w={480} bg={"#fffff"} mx='auto'>
        <h1 style={{ color: '#992844' }}>Spawn Selector</h1>
        <p>Select a location where you want to go</p>
        <img src="/web/red.png" />
        <Box bg={"#2b2b2b"} w={380} pos={"absolute"} bottom={"35%"} left={"6"} h={50} sx={{ border: "10px solid #2b2b2b", borderRadius: "50px" }}>
          <Flex justify="space-between" align="center" h="100%">
            <Button onClick={handlePreviousLocation} size="xs"><IconCaretLeft /></Button>
            <Text ta='center' c='white' size='xl' px={5} sx={{ borderRadius: 5 }} fw={700} fz='xl'>
              Location<br /> 
              {locations.length > 0 && locations[locationIndex]}
            </Text>
            <Button onClick={handleNextLocation} size="xs"><IconCaretRight /></Button>
          </Flex>
        </Box>

        <Box className={classes.bot} w={350}>
          <Flex justify="space-between" mt="auto">
            <Button onClick={handleReset} style={{ color: '#319151' }}>🗺️ Last Location</Button>
            <Button onClick={handleReset} style={{ color: '#b93751' }}>✔️ Select Location</Button>
          </Flex>
        </Box>
      </Box>
    </Box>*/
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
        <Button onClick={handleReset} style={{ color: 'white', position:"absolute", top:480, left:-200, width:380, height:50, backgroundColor:"red"}}>🗺️ Last Location</Button>
        </Box>
  );
}



