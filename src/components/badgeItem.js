import React, {Component} from 'react';
import {
    Card,
    CardItem,
    Right,
    Left,
    H3,
    Text
} from 'native-base';
import {TouchableWithoutFeedback, Platform, LayoutAnimation, UIManager, Image} from 'react-native';

export default class BadgeItem extends Component {

    state = {
        expanded: false
    };
    constructor() {
        super();

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentWillUpdate() {
        LayoutAnimation.spring();
    }

    renderDescription() {

        const {expanded} = this.state;

        console.log(expanded);
        if (expanded) {
            return (
                <CardItem>
                    <Text>
                        {this.props.item.messagesubject}
                    </Text>
                </CardItem>
            );
        }
    }

    changeFlag() {

        expanded = this.state.expanded;
        console.log("before " + expanded);

        expanded = !expanded;

        console.log("after " + expanded);

        this.setState({expanded});
    }

    render() {

        item = this.props.item;

        imageUrl = item.badgeurl;
        imageUrl = imageUrl.replace('webservice/', '');

        return (
            <TouchableWithoutFeedback onPress={() => this.changeFlag()}>
                <Card>
                    <CardItem>
                        <Left>
                            <H3
                                style={{
                                flexWrap: 'wrap'
                            }}>{item.name}</H3>
                        </Left>
                        <Right>
                            <Image
                                source={{
                                uri: imageUrl
                            }}
                                style={{
                                width: 75,
                                height: 75,
                                justifyContent: 'flex-end'
                            }}/>
                        </Right>
                    </CardItem>
                    {this.renderDescription()}
                </Card>
            </TouchableWithoutFeedback>
        );
    }
}
