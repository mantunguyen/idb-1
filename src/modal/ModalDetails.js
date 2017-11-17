import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ModalDetails.scss';
import ScrollableList from './ScrollableList';
import { Modal, Embed } from 'semantic-ui-react';

class ModalDetails extends Component {

  render() {
    const detailsStrings = this.props.detailsList.filter((detail) => detail !== null)
    return (
      <div className={styles.content}>
        <div className={styles.data}>
          <div className={styles.title}>  
            {this.props.title}
          </div>
          <div className={styles.details}>
            {detailsStrings.map((detail, index) => (
              <div key={index} className={styles.detailContainer}>
                <div className={styles.detail}>
                  {detail}
                </div>
                {index !== detailsStrings.length - 1 ?
                  <div className={styles.detail}>
                    •
                  </div> :
                  null
                }
              </div>   
            ))}
          </div>
          <div className={styles.paragraph}>
            {this.props.website ?
              (this.props.websiteText === "Link to trailer" ? 
                <div className={styles.link}>
                  <Modal trigger={<a>{this.props.websiteText} <br /></a>}>
                    <Embed id={this.props.website} source="youtube">
                    </Embed>
                  </Modal>
                </div> : 
                <div className={styles.link}>
                  <a
                    href={this.props.website}
                    target="_blank">
                    {this.props.websiteText} <br />
                  </a>
                </div>
              ) : null
            }
            <div>
              {this.props.paragraph}
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.listsContainer}>
          {this.props.lists.map(list => (
            <ScrollableList
              key={list.title}
              data={list.data}
              title={list.title}
              action={list.action} />
          ))}
        </div>
      </div>
    );
  }
}

ModalDetails.defaultProps = {
  title: "",
  detailsList: [],
  paragraph: "",
  websiteText: "",
}

ModalDetails.propTypes = {
  title: PropTypes.string,
  detailsList: PropTypes.array,
  paragraph: PropTypes.string,
  website: PropTypes.string,
  websiteText: PropTypes.string,
  lists: PropTypes.arrayOf(PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    action: PropTypes.func,
  })).isRequired,
}

export default ModalDetails;
