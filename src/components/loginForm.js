import React, {Component} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Card
} from 'native-base';
import {View, StyleSheet} from 'react-native';
export default class LoginForm extends Component {

  render() {

    return (
      <Form style={styles.formStyle}>
        <Item floatingLabel>
          <Label style={{
            paddingTop: 4
          }}>اسم المستخدم</Label>
          <Input onChangeText={this.props.onChangeText1} value={this.props.value1}/>
        </Item>

        <Item floatingLabel last>
          <Label style={{
            paddingTop: 4
          }}>كلمة السر</Label>
          <Input
            onChangeText={this.props.onChangeText2}
            value={this.props.value2}
            secureTextEntry={true}/>
        </Item>

      </Form>
    );
  }
}

const styles = StyleSheet.create({
  formStyle: {
    width: null,
    height: 200
  }
});
