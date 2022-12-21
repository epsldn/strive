import image1 from "../../assets/loginImage1.jpg";
import image2 from "../../assets/loginImage2.jpg";
import image3 from "../../assets/loginImage3.jpg";
import image4 from "../../assets/loginImage4.jpg";
import image5 from "../../assets/loginImage5.jpg";
import image6 from "../../assets/loginImage6.jpg";
import image7 from "../../assets/loginImage7.jpeg";

const imagePicker = () => {
    const imageArray = [image1, image2, image3, image4, image5, image6, image7];
    const randomIndex = Math.floor(Math.random() * imageArray.length);
    return imageArray[randomIndex];
};

export default imagePicker;