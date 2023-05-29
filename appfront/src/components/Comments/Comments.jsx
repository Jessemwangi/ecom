import React from "react";
import './Comment.scss'

const Comments = () => {
  return (
    <div class="comments-container">
      <h1 class="main-heading">comments</h1>
      <ul class="comments-list">
        <li>
          <div class="comment-main-level">
            <div class="comment-avatar">
              <img
                src="http://younginnovations.com.np/images/staffs/Rakesh.png"
                alt=""
              />
            </div>

            <div class="comment-box">
              <div class="comment-head">
                <h6 class="comment-name by-author">
                  <a href="">linkk plusplus</a>
                </h6>
                <span>have 20 minutes</span>
              </div>
              <div class="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                omnis animi et iure laudantium vitae, praesentium optio,
                sapiente distinctio illo?
              </div>
            </div>
          </div>

          <ul class="reply-list">
            <li>
              <div class="comment-main-level">
                <div class="comment-avatar">
                  <img
                    src="http://younginnovations.com.np/images/staffs/Biju.png"
                    alt=""
                  />
                </div>

                <div class="comment-box">
                  <div class="comment-head">
                    <h6 class="comment-name">
                      <a href="">linkk plusplus</a>
                    </h6>
                    <span>have 7 minutes</span>
                  </div>
                  <div class="comment-content">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Velit omnis animi et iure laudantium vitae, praesentium
                    optio, sapiente distinctio illo?
                  </div>
                </div>
              </div>

              <ul class="reply-list">
                <li>
                  <div class="comment-main-level">
                    <div class="comment-avatar">
                      <img
                        src="http://younginnovations.com.np/images/staffs/Rakesh.png"
                        alt=""
                      />
                    </div>

                    <div class="comment-box">
                      <div class="comment-head">
                        <h6 class="comment-name by-author">
                          <a href="g">linkk plusplus</a>
                        </h6>
                        <span>have 2 minutes</span>
                      </div>
                      <div class="comment-content">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Velit omnis animi et iure laudantium vitae,
                        praesentium optio, sapiente distinctio illo?
                      </div>
                    </div>
                  </div>
                </li>

                <ul class="reply-list">
                  <li>
                    <div class="comment-main-level">
                      <div class="comment-avatar">
                        <img
                          src="http://younginnovations.com.np/images/staffs/Biju.png"
                          alt=""
                        />
                      </div>

                      <div class="comment-box">
                        <div class="comment-head">
                          <h6 class="comment-name">
                            <a href="">linkk plusplus</a>
                          </h6>
                          <span>have 10 minutes</span>
                        </div>
                        <div class="comment-content">
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Velit omnis animi et iure laudantium vitae,
                          praesentium optio, sapiente distinctio illo?
                        </div>
                      </div>
                    </div>

                    <ul class="reply-list">
                      <li>
                        <div class="comment-main-level">
                          <div class="comment-avatar">
                            <img
                              src="http://younginnovations.com.np/images/staffs/Sweta.png"
                              alt=""
                            />
                          </div>

                          <div class="comment-box">
                            <div class="comment-head">
                              <h6 class="comment-name">
                                <a href="">linkk plusplus</a>
                              </h6>
                              <span>have 30 minutes</span>
                            </div>
                            <div class="comment-content">
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
                    <div class="comment-main-level">
                      <div class="comment-avatar">
                        <img
                          src="http://younginnovations.com.np/images/staffs/Rakesh.png"
                          alt=""
                        />
                      </div>

                      <div class="comment-box">
                        <div class="comment-head">
                          <h6 class="comment-name by-author">
                            <a href="">linkk plusplus</a>
                          </h6>
                          <span>have 10 minutes</span>
                        </div>
                        <div class="comment-content">
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
          <div class="comment-main-level">
            <div class="comment-avatar">
              <img
                src="http://younginnovations.com.np/images/staffs/Sumit.png"
                alt=""
              />
            </div>

            <div class="comment-box">
              <div class="comment-head">
                <h6 class="comment-name by-author">
                  <a href="">linkk plusplus</a>
                </h6>
                <span>have 20 minutes</span>
              </div>
              <div class="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                omnis animi et iure laudantium vitae, praesentium optio,
                sapiente distinctio illo?
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="comment-main-level">
            <div class="comment-avatar">
              <img
                src="http://younginnovations.com.np/images/staffs/Nirajan.png"
                alt=""
              />
            </div>

            <div class="comment-box">
              <div class="comment-head">
                <h6 class="comment-name by-author">
                  <a href="/">link +++</a>
                </h6>
                <span>have 5 minutes</span>
              </div>
              <div class="comment-content">
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
