import React, { useContext, useState } from "react";

type FriendsMenuProps = {};

export const FriendsMenu: React.SFC<FriendsMenuProps> = () => {

    return (
        <>

            <section className="header-user-list">
                <div className="h-list-header">
                    <div className="input-group">
                        <input type="text" id="search-friends" className="form-control" placeholder="Search Friend . . ." />
                    </div>
                </div>
                <div className="h-list-body">
                    <a href="#!" className="h-close-text"><i className="feather icon-chevrons-right"></i></a>
                    <div className="main-friend-cont scroll-div">
                        <div className="main-friend-list">
                            <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image " />
                                    <div className="live-status">3</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image " />
                                    <div className="live-status">3</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image " />
                                    <div className="live-status">3</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="1" data-status="online" data-username="Josephin Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image " />
                                    <div className="live-status">3</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Josephin Doe<small className="d-block text-c-green">Typing . . </small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="2" data-status="online" data-username="Lary Doe">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Lary Doe<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="3" data-status="online" data-username="Alice">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-3.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alice<small className="d-block text-c-green">online</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="4" data-status="offline" data-username="Alia">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-1.jpg" alt="Generic placeholder image" />
                                    <div className="live-status">1</div>
                                </a>
                                <div className="media-body">
                                    <h6 className="chat-header">Alia<small className="d-block text-muted">10 min ago</small></h6>
                                </div>
                            </div>
                            <div className="media userlist-box" data-id="5" data-status="offline" data-username="Suzen">
                                <a className="media-left" href="#!"><img className="media-object img-radius" src="assets/images/user/avatar-4.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body">
                                    <h6 className="chat-header">Suzen<small className="d-block text-muted">15 min ago</small></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="header-chat">
                <div className="h-list-header">
                    <h6>Josephin Doe</h6>
                    <a href="#!" className="h-back-user-list"><i className="feather icon-chevron-left"></i></a>
                </div>
                <div className="h-list-body">
                    <div className="main-chat-cont scroll-div">
                        <div className="main-friend-chat">
                            <div className="media chat-messages">
                                <a className="media-left photo-table" href="#!"><img className="media-object img-radius img-radius m-t-5" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body chat-menu-content">
                                    <div className="">
                                        <p className="chat-cont">hello Datta! Will you tell me something</p>
                                        <p className="chat-cont">about yourself?</p>
                                    </div>
                                    <p className="chat-time">8:20 a.m.</p>
                                </div>
                            </div>
                            <div className="media chat-messages">
                                <div className="media-body chat-menu-reply">
                                    <div className="">
                                        <p className="chat-cont">Ohh! very nice</p>
                                    </div>
                                    <p className="chat-time">8:22 a.m.</p>
                                </div>
                            </div>
                            <div className="media chat-messages">
                                <a className="media-left photo-table" href="#!"><img className="media-object img-radius img-radius m-t-5" src="assets/images/user/avatar-2.jpg" alt="Generic placeholder image" /></a>
                                <div className="media-body chat-menu-content">
                                    <div className="">
                                        <p className="chat-cont">can you help me?</p>
                                    </div>
                                    <p className="chat-time">8:20 a.m.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-list-footer">
                    <div className="input-group">
                        <input type="file" className="chat-attach" style={{ display: "none" }} />
                        <a href="#!" className="input-group-prepend btn btn-success btn-attach">
                            <i className="feather icon-paperclip"></i>
                        </a>
                        <input type="text" name="h-chat-text" className="form-control h-send-chat" placeholder="Write hear . . " />
                        <button type="submit" className="input-group-append btn-send btn btn-primary">
                            <i className="feather icon-message-circle"></i>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};
export default FriendsMenu;
