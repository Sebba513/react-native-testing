import React from 'react';
import { StyleSheet, Text, View, TextInput, Button} from 'react-native';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      what: '',
      when: '',
      where: '',
      appointments: [],
      index: 0
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    console.log("hello");
  }


  handleSubmit(event) {
    this.setState({
      appointments: this.state.appointments.concat([
        {
          what: this.state.what,
          when: this.state.when,
          where: this.state.where,
          index: this.state.index,
        },
      ]),
      what: '',
      when: '',
      where: '',
      index: ++this.state.index,
    });
  }

  removeAppointment(key) {
    const appointments = this.state.appointments;
    appointments.forEach((appointment, index) => {
      if (appointment.index === key) {
        appointments.splice(index, 1);
      }
    });
    this.setState({
      appointments,
    });
  }

  buildlist() {
    const list = [];
    this.state.appointments.forEach((appointment) => {
      list.push(
        <View key={appointment.index}>
          <Text>What: {appointment.what}</Text>
          <Text >When: {appointment.when}</Text>
          <Text >Where: {appointment.where}</Text>
          <Button title="delete" onPress={() => { this.removeAppointment(appointment.index); }}>Remove Event </Button>
        </View>,
      );
    });
    return list;
  }

  render() {
    const appointmentList = this.buildlist();
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} >
          <Text style={{color: 'black', fontSize: 40, textAlign: 'center', padding: 50}}>Appointments</Text>
        </View>
        <View style={{flex: 2, backgroundColor: 'skyblue'}} >
          <Text> What </Text>
          <TextInput
            style={{height: 40}}
            onChangeText={(what) => this.setState({what})}
            placeholder="What"
          />
          <Text> When </Text>
          <TextInput
            style={{height: 40}}
            onChangeText={(when) => this.setState({when})}
            placeholder="When"
          />
          <Text> Where </Text>
          <TextInput
            style={{height: 40}}
            onChangeText={(where) => this.setState({where})}
            placeholder="Where"
          />
          <Button onPress={this.handleSubmit} title="Add Appointment" />
        </View>

        <View style={{flex: 4, backgroundColor: 'steelblue'}} >
          {appointmentList}
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
