/*import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { colors, parameters } from "../global/styles";
import { AuthContext } from "./../contexts/AuthContext";
import ScannerQR from "./ScannerQR";

const ReclamationScreen = () => {
  const [reclamations, setReclamations] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [scannerVisible, setScannerVisible] = useState(false);

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await fetch(
          "http://172.16.1.140:4000/api/rec/assigned-reclamations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log( data);

        setReclamations(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReclamations(); // Don't forget to call the function here
  }, [userInfo.token]);

  return (
    <View>
      <Text style={styles.text}>Réclamations Assignées</Text>
      <FlatList
        data={reclamations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 4 }}>
                <Text style={styles.te}>
                  <Text style={styles.t}>Id :</Text> {item._id}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Client :</Text> {item.client}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Equipement :</Text> {item.equipement}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Etat :</Text> {item.etat}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

  </View>
  );
};

export default ReclamationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 50,
    padding: 9,
    paddingTop: parameters.statusBarHeight,
  },
  text: {
    marginTop: 25,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: colors.tunisys,
    textAlign: "center",
  },
  t: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
  },
  te: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
  },
  card: {
    marginTop: 10,
    borderRadius: 15, // This might be a string value like '0.75rem' in React Native
    padding: 16, // Use a numeric value for padding
    cursor: "pointer",
    backgroundColor: "#FFFF",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.03, // Adjust the shadow opacity
    shadowRadius: 16, // Adjust the shadow radius
    position: "relative",
  },
  b: {
    color: colors.white,
    textAlign: "center",
    padding: 10,
    fontFamily: "Poppins-Bold",
  },
  button: {
    backgroundColor: colors.tunisys,
    borderRadius: 10,
    width: 90,
    height: 40,
  },
});
*/
import React, { useState, useEffect, useContext, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import { colors, parameters } from "../global/styles";
import { Icon } from "react-native-elements";
import { AuthContext } from "./../contexts/AuthContext";
import {HelpRecContext} from "./../contexts/RecContext"
import ScannerQR from "./ScannerQR";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Linking } from "react-native";
const ReclamationScreen = () => {
  //const [reclamations, setReclamations] = useState([]);
  const [reclamationId, setreclamationid] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const { reclamations,dispatch } = useContext(HelpRecContext);

  const [scannerVisible, setScannerVisible] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Accepter");
  const navigation = useNavigation();

  /*const initialButtonStates = reclamations.map(() => ({
    buttonLabel: "Accepter",
  }));
*/

  useEffect(() => {
    const fetchReclamations = async () => {
      try {
        const response = await fetch(
          "http://172.16.1.140:4000/api/rec/assigned-reclamations",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        // Dispatch the action with the data
        dispatch({ type: SET_HREC, payload: data });
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchReclamations(); 
  }, [dispatch, userInfo.token]);

  

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={{ marginTop: "10" }}
        >
          <Icon type="material-community" name="menu" size={40} />
        </TouchableOpacity>
        <Text style={styles.text}>Réclamations Assignées</Text>
      </View>
      {scannerVisible ? (
        <ScannerQR reclamationId={reclamationId} />
      ) : (

        <FlatList
        data={reclamations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginLeft: 4 }}>
                <Text style={styles.te}>
                  <Text style={styles.t}>Id :</Text> {item.idn}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Client :</Text> {item.client}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Equipement :</Text> {item.equipement}
                </Text>
                <Text style={styles.te}>
                  <Text style={styles.t}>Etat :</Text> {item.etat}
                </Text>

                    <TouchableOpacity
                      style={{ backgroundColor: "red" }}
                      onPress={() => handleButtonDebuter(index)}
                    >
                      <Text style={styles.b}>Debuter</Text>
                    </TouchableOpacity>
                <View>
                <TouchableOpacity
                  style={styles.buttondown}
                  onPress={() => openPhoneDialer(item.telephone)} >
                  <Ionicons
                    name="ios-call"
                    size={15}
                    color="gray"
                    style={styles.icon}
                  />
                  <Text style={styles.textdown}>Télephoner</Text>
                </TouchableOpacity>
                </View>
                 <TouchableOpacity
                  style={styles.buttondown}
                  onPress={() => openPhoneDialer(item.telephone)} >
                  <Ionicons
                    name="ios-call"
                    size={15}
                    color="gray"
                    style={styles.icon}
                  />
                  <Text style={styles.textdown}>Télephoner</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      
      )}
    </View>
  );
};

export default ReclamationScreen;

const styles = StyleSheet.create({
  display:{
    flexDirection: "row",

  },
  icon: { marginRight: 1, marginTop: 7, marginLeft: 40 },
  separator: {
    backgroundColor: "gray", // Couleur grise
    marginVertical: 1,
    marginLeft: -20,
    marginTop: 8, // Espace au-dessus et en dessous de la ligne
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 50,
    padding: 9,
    paddingTop: parameters.statusBarHeight,
  },
  text: {
    marginTop: 25,
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: colors.tunisys,
    textAlign: "center"
  },
  t: {
    fontSize: 14,
    fontWeight: "600",
    color: "#696969",
  },
  te: {
    // marginTop:-20,
    fontFamily: "Poppins-Light",
    fontSize: 15,
    color: "#696969",
  },

  card: {
    //  marginTop: 10,
    borderRadius: 15, // This might be a string value like '0.75rem' in React Native
    padding: 12, // Use a numeric value for padding
    cursor: "pointer",
    backgroundColor: "#f1f1f3",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.03, // Adjust the shadow opacity
    shadowRadius: 16, // Adjust the shadow radius
    position: "relative",
    marginTop: 20,
  },
  b: {
    color: colors.white,
    textAlign: "center",
    paddingTop: 8,
    fontFamily: "Poppins-Light",
    fontSize: 10,
  },
  button: {
    borderRadius: 10,
    width: 90,
    height: 40,
    marginLeft: 230,

    marginTop: -30,
  },

  textdown: {
    color: "gray",
    paddingLeft: 9,
    paddingTop: 7,
    fontSize: 12,
    fontFamily: "Poppins-Light",
  },
  buttondown: {
    borderWidth: 0.5, // Add a very thin border
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    borderColor: "white",
    //marginTop: 5,
    width: 182,
    height: 30,
    //backgroundColor: colors.tunisys,
    flexDirection: "row",
  },
  image: {
    width: 18,
    height: 18,
    //  marginRight:90,
  },
  etatAffecte: {
    color: "#4169e1",
    // marginTop:5,
  },
  etatDebute: {
    color: "green",
  },
  etatDefault: {
    color: "black",
  },
});
