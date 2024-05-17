import React, {useState}  from "react";
import {Navbar} from "../navbar/date"

export const Main =() => {
    const [modalInfolsOpen,setModalInfoOpen] = useState(false);
    return(
        <main className="main">
            <section className="section">
                <button onClick={() => modalInfolsOpen(true)} className="modal-show-button">
                    Button</button>
                
                <Navbar
                isOpen={modalInfolsOpen}
                onClose={() => modalInfolsOpen(false)}
                >
                    <h2>Modal info</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias deleniti culpa optio quaerat id ipsum dolores sequi ea suscipit est aspernatur placeat expedita, magnam ad! Et repellendus magni culpa eveniet.</p>
                    
                    </Navbar>
            </section>
        </main>
    )
}