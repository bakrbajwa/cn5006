import React, { useState } from "react";
import Button from "./Button.js";
import './App.css';
import './Calculator.css';

function KeyPadComponent() {
    // State for calculator input
    const [text1, setText] = useState("");
    // State to control showing your picture
    const [showImage, setShowImage] = useState(false);

    // Function to handle button clicks
    const ClickHandle = (e) => {
        const value = e.target.value;

        if (value === "C") {
            setText("");     
            setShowImage(false); // Hide image when cleared
        } 
        else if (value === "=") {
            try {
                const result = eval(text1);
                setText(result);
                alert(result);             
            } catch {
                setText("Error");
            }
            setShowImage(false);
        } 
        else if (value === "show me") {
            setText("");          // Clear input
            setShowImage(true);   // Show image
        } 
        else if (value === "square") {
            try {
                const result = Math.pow(eval(text1), 2);
                setText(result);
            } catch {
                setText("Error");
            }
            setShowImage(false);
        } 
        else {
            setText(text1 + value);
            setShowImage(false); // Hide image when typing numbers/operators
        }
    };

    return (
        <div className="Calculator">
            {/* Input screen */}
            <div className="screen-row">
                <input type="text" readOnly value={text1} />
            </div>

            {/* Show image if "show me" button clicked */}
            {showImage && (
                <div className="image-container">
                    <img src="img.jfif" alt="Me" width="100" />

                </div>
            )}

            {/* Calculator keypad */}
            <div>
                <Button label="(" ClickHandle={ClickHandle} />
                <Button label="CE" ClickHandle={ClickHandle} />
                <Button label=")" ClickHandle={ClickHandle}/>
                <Button label="C" ClickHandle={ClickHandle}/> 
            </div>

            <div>
                <Button label="1"  ClickHandle={ClickHandle}/>
                <Button label="2" ClickHandle={ClickHandle}/>
                <Button label="3" ClickHandle={ClickHandle}/>
                <Button label="+" ClickHandle={ClickHandle}/>
            </div>

            <div>
                <Button label="4" ClickHandle={ClickHandle}/>
                <Button label="5" ClickHandle={ClickHandle}/>
                <Button label="6" ClickHandle={ClickHandle}/>
                <Button label="-" ClickHandle={ClickHandle}/>
            </div>

            <div>
                <Button label="7" ClickHandle={ClickHandle}/>
                <Button label="8" ClickHandle={ClickHandle}/>
                <Button label="9" ClickHandle={ClickHandle}/>
                <Button label="*" ClickHandle={ClickHandle}/>
            </div>

            <div>
                <Button label="." ClickHandle={ClickHandle}/>
                <Button label="0" ClickHandle={ClickHandle}/>
                <Button label="=" ClickHandle={ClickHandle}/>
                <Button label="/" ClickHandle={ClickHandle}/>
            </div>

            {/* Task 2 & Task 3 buttons */}
            <div>
                <Button label="show me" ClickHandle={ClickHandle}/>
                <Button label="square" ClickHandle={ClickHandle}/>
            </div>
        </div>
    );
}

export default KeyPadComponent;
