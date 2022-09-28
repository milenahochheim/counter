import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

function App() {
  const [number, setNumber] = useState();
  const [button, setButton] = useState("GO");
  const [last, setLast] = useState(null);

  function go() {
    if (timer !== null) {
      //Aqui vai parar o timer
      clearInterval(timer);
      timer = null;

      setButton("GO");
    } else {
      //Comecar a girar o timer...
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }

        //adicionando o 0 na frente = 03:00:00 - apenas quando menor que 10

        let format =
          (hh < 10 ? "0" + hh : hh) +
          ":" +
          (mm < 10 ? "0" + mm : mm) +
          ":" +
          (ss < 10 ? "0" + ss : ss);

        setNumber(format);
      }, 1000);

      setButton("STOP");
    }
  }

  function clean() {
    if (timer !== null) {
      //Parar o timer!
      clearInterval(timer);
      timer = null;
    }

    setLast(number);
    setNumber();
    ss = 0;
    mm = 0;
    hh = 0;
    setButton("GO");
  }

  return (
    <View style={styles.container}>
      <Image source={require("./src/crono.png")} />

      <Text style={styles.timer}> {number} </Text>

      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={go}>
          <Text style={styles.btnTexto}> {button} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={clean}>
          <Text style={styles.btnTexto}>CLEAN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaUltima}>
        <Text style={styles.textoTime}>{last ? "Last Time: " + last : ""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9932CC",
  },
  timer: {
    marginTop: -160,
    fontSize: 45,
    fontWeight: "bold",
    color: "#FFF",
  },
  btnArea: {
    flexDirection: "row",
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
    height: 40,
    margin: 17,
    borderRadius: 9,
  },
  btnTexto: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#9932CC",
  },
  areaUltima: {
    marginTop: 40,
  },
  textoTime: {
    fontSize: 22,
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default App;
