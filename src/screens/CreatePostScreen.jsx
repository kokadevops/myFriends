import { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Image,
    Button,
    KeyboardAvoidingView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import profileImg from "../../assets/images/user.png";

const user = {
    id: "u1",
    name: "KokaDevops",
};

const CreatePostScreen = () => {
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const insets = useSafeAreaInsets();

    const navigation = useNavigation();
    const onSubmit = () => {
        console.warn("On submit", description);
        setDescription("");

        navigation.goBack();
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, { marginBottom: insets.bottom }]}
            contentContainerStyle={{ flex: 1 }}
            keyboardVerticalOffset={150}
        >
            <View style={styles.header}>
                <Image source={profileImg} style={styles.profileImage} />
                <Text style={styles.name}>{user.name}</Text>
                <Entypo
                    onPress={pickImage}
                    name="images"
                    size={24}
                    color="limegreen"
                    style={styles.icon}
                />
            </View>

            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="What is on your mind?"
                multiline
            />

            {image && <Image source={{ uri: image }} style={styles.image} />}

            <View style={styles.buttonContainer}>
                <Button title="Post" onPress={onSubmit} />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 10,
    },
    profileImage: {
        height: 40,
        width: 40,
        borderRadius: 30,
        marginRight: 10,
    },
    image: {
        width: "50%",
        aspectRatio: 4 / 3,
        alignSelf: "center",
    },
    name: {
        fontWeight: "500",
    },
    buttonContainer: {
        marginTop: "auto",
    },
    icon: {
        marginLeft: "auto",
    },
});

export default CreatePostScreen;
