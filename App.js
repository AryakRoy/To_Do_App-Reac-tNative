import React ,{useState} from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from "./components/Task.js"
export default function App() {
  const [task,settask] = useState('');
  const [tasks,settasks] = useState([]);
  const handleAddTask = () => {
    if (task !== ""){
      Keyboard.dismiss();
      settasks([...tasks,task]);
      settask("");
    } 
  }
  const completeTask = (index) => {
    let itemsCopy = [...tasks];
    itemsCopy.splice(index,1);
    settasks(itemsCopy);
  }
  return (
    <View style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>
        <View style={styles.items}>
          {
            tasks.map((item,index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task  text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
      <KeyboardAvoidingView 
        behavior = {
          Platform.OS === "ios" ? "padding" : "height"
        }
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} value={task} onChangeText={(text) => settask(text)} placeholder="Add a Task"/>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper : {
    paddingTop : 80,
    paddingHorizontal : 20,

  },
  sectionTitle : {
    fontSize : 24,
    fontWeight : 'bold'
  },
  items : {
    marginTop : 30
  },
  writeTaskWrapper : {
    position : 'absolute',
    bottom : 30,
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center'
  },
  input : {
    backgroundColor : '#fff',
    paddingVertical : 15,
    paddingHorizontal : 25,
    width : '70%',
    borderRadius : 60,
    borderColor : '#C0C0C0',
  },
  addWrapper : {
    height : 60,
    width : 60,
    backgroundColor : '#fff',
    borderRadius : 60,
    justifyContent : 'center',
    alignItems : 'center',
    borderColor : '#C0C0C0',
  },
  addText : {
    fontSize : 27,
    color : '#C0C0C0'
  },
});
