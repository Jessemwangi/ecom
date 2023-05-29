import React from "react";
import './Comment.scss'

const Comments = () => {
  return (
    <div className="comments-container">
      <h1 className="main-heading">comments</h1>
      <ul className="comments-list">
        <li>
          <div className="comment-main-level">
            <div className="comment-avatar">
              <img
                src="http://younginnovations.com.np/images/staffs/Rakesh.png"
                alt=""
              />
            </div>

            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name by-author">
                  <a href="">linkk plusplus</a>
                </h6>
                <span>have 20 minutes</span>
              </div>
              <div className="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                omnis animi et iure laudantium vitae, praesentium optio,
                sapiente distinctio illo?
              </div>
            </div>
          </div>

          <ul className="reply-list">
            <li>
              <div className="comment-main-level">
                <div className="comment-avatar">
                  <img
                    src="http://younginnovations.com.np/images/staffs/Biju.png"
                    alt=""
                  />
                </div>

                <div className="comment-box">
                  <div className="comment-head">
                    <h6 className="comment-name">
                      <a href="">linkk plusplus</a>
                    </h6>
                    <span>have 7 minutes</span>
                  </div>
                  <div className="comment-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Velit omnis animi et iure laudantium vitae, praesentium
                    optio, sapiente distinctio illo?
                  </div>
                </div>
              </div>

              <ul className="reply-list">
                <li>
                  <div className="comment-main-level">
                    <div className="comment-avatar">
                      <img
                        src="http://younginnovations.com.np/images/staffs/Rakesh.png"
                        alt=""
                      />
                    </div>

                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name by-author">
                          <a href="g">linkk plusplus</a>
                        </h6>
                        <span>have 2 minutes</span>
                      </div>
                      <div className="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Velit omnis animi et iure laudantium vitae,
                        praesentium optio, sapiente distinctio illo?
                      </div>
                    </div>
                  </div>
                </li>

                <ul className="reply-list">
                  <li>
                    <div className="comment-main-level">
                      <div className="comment-avatar">
                        <img
                          src="http://younginnovations.com.np/images/staffs/Biju.png"
                          alt=""
                        />
                      </div>

                      <div className="comment-box">
                        <div className="comment-head">
                          <h6 className="comment-name">
                            <a href="">linkk plusplus</a>
                          </h6>
                          <span>have 10 minutes</span>
                        </div>
                        <div className="comment-content">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Velit omnis animi et iure laudantium vitae,
                          praesentium optio, sapiente distinctio illo?
                        </div>
                      </div>
                    </div>

                    <ul className="reply-list">
                      <li>
                        <div className="comment-main-level">
                          <div className="comment-avatar">
                            <img
                              src="http://younginnovations.com.np/images/staffs/Sweta.png"
                              alt=""
                            />
                          </div>

                          <div className="comment-box">
                            <div className="comment-head">
                              <h6 className="comment-name">
                                <a href="">linkk plusplus</a>
                              </h6>
                              <span>have 30 minutes</span>
                            </div>
                            <div className="comment-content">
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit. Velit omnis animi et iure
                              laudantium vitae, praesentium optio, sapiente
                              distinctio illo?
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <div className="comment-main-level">
                      <div className="comment-avatar">
                        <img
                          src="http://younginnovations.com.np/images/staffs/Rakesh.png"
                          alt=""
                        />
                      </div>

                      <div className="comment-box">
                        <div className="comment-head">
                          <h6 className="comment-name by-author">
                            <a href="">linkk plusplus</a>
                          </h6>
                          <span>have 10 minutes</span>
                        </div>
                        <div className="comment-content">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Velit omnis animi et iure laudantium vitae,
                          praesentium optio, sapiente distinctio illo?
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </ul>
            </li>
          </ul>
        </li>
        <li>
          <div className="comment-main-level">
            <div className="comment-avatar">
              <img
                src="http://younginnovations.com.np/images/staffs/Sumit.png"
                alt=""
              />
            </div>

            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name by-author">
                  <a href="">linkk plusplus</a>
                </h6>
                <span>have 20 minutes</span>
              </div>
              <div className="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                omnis animi et iure laudantium vitae, praesentium optio,
                sapiente distinctio illo?
              </div>
            </div>
          </div>
        </li>
        <li>
          <div className="comment-main-level">
            <div className="comment-avatar">
              <img
                src="http://younginnovations.com.np/images/staffs/Nirajan.png"
                alt=""
              />
            </div>

            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name by-author">
                  <a href="/">link +++</a>
                </h6>
                <span>have 5 minutes</span>
              </div>
              <div className="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                omnis animi et iure laudantium vitae, praesentium optio,
                sapiente distinctio illo?
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Comments;
