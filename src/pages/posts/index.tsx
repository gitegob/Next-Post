import { GetStaticProps } from 'next';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link';
import { Post } from '../../shared/post';
import { PostsProps } from '../../shared/Posts.props';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Posts = ({ posts }:PostsProps) => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Body</TableCell>
            <TableCell align="right">Owner Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts?.map((post) => (
            <TableRow key={post.id}>
              <TableCell component="th" scope="row">
                {post.id}
              </TableCell>
              <TableCell align="right">{post.title}</TableCell>
              <TableCell align="right">{post.body}</TableCell>
              <TableCell align="right">{post.userId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const res:{data?: Post[]} = await (await fetch('http://localhost:3000/api/posts')).json();
  return {
    props: {
      posts:res.data
    },
  };
}
export default Posts;