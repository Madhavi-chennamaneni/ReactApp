import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { Collapse } from "react-collapse";
import classNames from "classnames";

class Posts extends React.Component {
  constructor(props) {
    super(props);

    this.toggleClass = this.toggleClass.bind(this);
    this.state = {
      activeIndex: null
    };
  }

  toggleClass(index, e) {
    this.setState({
      activeIndex: this.state.activeIndex === index ? null : index
    });
  }

  moreLess(index) {
    if (this.state.activeIndex === index) {
      return (
        <span>
          <i className="fas fa-angle-up" /> Less
        </span>
      );
    } else {
      return (
        <span>
          <i className="fas fa-angle-down" /> More
        </span>
      );
    }
  }

  render() {
    let content;
    const { activeIndex } = this.state;
    const posts = [
      {
        id: "1",
        title: "Lorem Ipsum",
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Posuere urna nec tincidunt praesent semper feugiat nibh sed. Id aliquet risus feugiat in ante metus. Convallis posuere morbi leo urna molestie at elementum eu. Nibh mauris cursus mattis molestie a. Bibendum at varius vel pharetra vel. Bibendum enim facilisis gravida neque convallis a cras semper auctor. Sagittis vitae et leo duis ut diam quam nulla. Iaculis nunc sed augue lacus viverra vitae. Aliquet eget sit amet tellus cras adipiscing enim. Volutpat diam ut venenatis tellus in metus vulputate eu. Malesuada nunc vel risus commodo viverra maecenas. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Tortor dignissim convallis aenean et tortor at risus viverra. Faucibus et molestie ac feugiat sed lectus."
      },
      {
        id: "2",
        title: "Sollicitudin nibh",
        message:
          "Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Eu lobortis elementum nibh tellus molestie nunc non. In arcu cursus euismod quis viverra nibh. Bibendum arcu vitae elementum curabitur vitae. Est lorem ipsum dolor sit amet consectetur. A diam sollicitudin tempor id eu nisl nunc mi. Pretium nibh ipsum consequat nisl vel pretium lectus quam id. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Enim lobortis scelerisque fermentum dui faucibus. Enim tortor at auctor urna nunc id cursus. At augue eget arcu dictum varius duis at consectetur. Id venenatis a condimentum vitae. Aenean euismod elementum nisi quis."
      }
    ];

    if (this.props.loading) {
      content = "Loading...";
    } else {
      content = posts.map((post, index) => {
        return (
          <li key={index}>
            <div>
              <p>{post.title}</p>
              <Collapse isOpened={activeIndex === index}>
                <div
                  className={classNames("alert alert-info msg", {
                    show: activeIndex === index,
                    hide: activeIndex !== index
                  })}
                >
                  {post.message}
                </div>
              </Collapse>
              <button
                className="btn btn-primary btn-xs"
                onClick={this.toggleClass.bind(this, index)}
              >
                {this.moreLess(index)}
              </button>
            </div>
          </li>
        );
      });
    }
    return (
      <div>
        <h1>Posts!</h1>
        <div className="row">
          <div className="col-md-6">
            <ul>{content}</ul>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Posts />, rootElement);