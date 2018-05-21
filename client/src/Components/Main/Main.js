import React from 'react';

const Main = props => {
    return (
        <section className="section">
            <div className="columns is-centered">
                <div className="column is-9">
                    {
                        props.businesses.map(business => {
                            return (
                                <div key={business.id} className="box has-background-primary">
                                <div className="media">
                                    <figure className="media-left">
                                        <div className="image is-96x96">
                                            <img src={business.img} alt={business.name} />
                                        </div>
                                    </figure>
                                    <div className="media-content">
                                        <div className="content">
                                            <p className="is-size-4 has-text-white-ter">{business.name}</p>
                                            <p className="has-text-white-ter is-italic">"{business.review}"</p>
                                            <button className="button">0</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default Main;