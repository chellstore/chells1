import { createAlgorithm02 } from '../../type/matrix/utils/algorithm02.js';
import { createAlgorithm11 } from '../../type/matrix/utils/algorithm11.js';
import { createAlgorithm13 } from '../../type/matrix/utils/algorithm13.js';
import { createAlgorithm14 } from '../../type/matrix/utils/algorithm14.js';
import { createAlgorithm06 } from '../../type/matrix/utils/algorithm06.js';
import { factory } from '../../utils/factory.js';
import { andNumber } from '../../plain/number/index.js';
var name = 'and';
var dependencies = ['typed', 'matrix', 'equalScalar', 'zeros', 'not'];
export var createAnd = /* #__PURE__ */factory(name, dependencies, _ref => {
  var {
    typed,
    matrix,
    equalScalar,
    zeros,
    not
  } = _ref;
  var algorithm02 = createAlgorithm02({
    typed,
    equalScalar
  });
  var algorithm06 = createAlgorithm06({
    typed,
    equalScalar
  });
  var algorithm11 = createAlgorithm11({
    typed,
    equalScalar
  });
  var algorithm13 = createAlgorithm13({
    typed
  });
  var algorithm14 = createAlgorithm14({
    typed
  });
  /**
   * Logical `and`. Test whether two values are both defined with a nonzero/nonempty value.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.and(x, y)
   *
   * Examples:
   *
   *    math.and(2, 4)   // returns true
   *
   *    a = [2, 0, 0]
   *    b = [3, 7, 0]
   *    c = 0
   *
   *    math.and(a, b)   // returns [true, false, false]
   *    math.and(a, c)   // returns [false, false, false]
   *
   * See also:
   *
   *    not, or, xor
   *
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} x First value to check
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} y Second value to check
   * @return {boolean | Array | Matrix}
   *            Returns true when both inputs are defined with a nonzero/nonempty value.
   */

  return typed(name, {
    'number, number': andNumber,
    'Complex, Complex': function ComplexComplex(x, y) {
      return (x.re !== 0 || x.im !== 0) && (y.re !== 0 || y.im !== 0);
    },
    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return !x.isZero() && !y.isZero() && !x.isNaN() && !y.isNaN();
    },
    'Unit, Unit': function UnitUnit(x, y) {
      return this(x.value || 0, y.value || 0);
    },
    'SparseMatrix, SparseMatrix': function SparseMatrixSparseMatrix(x, y) {
      return algorithm06(x, y, this, false);
    },
    'SparseMatrix, DenseMatrix': function SparseMatrixDenseMatrix(x, y) {
      return algorithm02(y, x, this, true);
    },
    'DenseMatrix, SparseMatrix': function DenseMatrixSparseMatrix(x, y) {
      return algorithm02(x, y, this, false);
    },
    'DenseMatrix, DenseMatrix': function DenseMatrixDenseMatrix(x, y) {
      return algorithm13(x, y, this);
    },
    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return this(matrix(x), matrix(y)).valueOf();
    },
    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return this(matrix(x), y);
    },
    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return this(x, matrix(y));
    },
    'SparseMatrix, any': function SparseMatrixAny(x, y) {
      // check scalar
      if (not(y)) {
        // return zero matrix
        return zeros(x.size(), x.storage());
      }

      return algorithm11(x, y, this, false);
    },
    'DenseMatrix, any': function DenseMatrixAny(x, y) {
      // check scalar
      if (not(y)) {
        // return zero matrix
        return zeros(x.size(), x.storage());
      }

      return algorithm14(x, y, this, false);
    },
    'any, SparseMatrix': function anySparseMatrix(x, y) {
      // check scalar
      if (not(x)) {
        // return zero matrix
        return zeros(x.size(), x.storage());
      }

      return algorithm11(y, x, this, true);
    },
    'any, DenseMatrix': function anyDenseMatrix(x, y) {
      // check scalar
      if (not(x)) {
        // return zero matrix
        return zeros(x.size(), x.storage());
      }

      return algorithm14(y, x, this, true);
    },
    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return this(matrix(x), y).valueOf();
    },
    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return this(x, matrix(y)).valueOf();
    }
  });
});