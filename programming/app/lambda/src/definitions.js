
/* object containing hardcoded constants and aliases definitions, also method for associating with the main object*/
const Constant = {
    pri_false : new Primitive("FALSE", new BaseType("Bool")),
    
    pri_true  : new Primitive("TRUE", new BaseType("Bool")),
    
    pri_n     : (n) => new Primitive(n, new BaseType("Int")),
    
    constant_k_comb : new Primitive("K", null, 2, (x,y) => x),
    
    constant_s_comb : new Primitive("S", null, 3, (x,y,z) => new App(new App(x, z), new App(y, z))),
    
    constant_i_comb : new Primitive("I", null, 1, (x) => x),
    
    constant_times  : new Primitive(
        "TIMES",
        new FunctionType(new BaseType("Int"), new FunctionType(new BaseType("Int"), new BaseType("Int"))),
        2,
        (x,y) => Constant.pri_n(parseInt(x.name,10) * parseInt(y.name,10))),
    
    constant_minus  : new Primitive(
        "MINUS",
        new FunctionType(new BaseType("Int"), new FunctionType(new BaseType("Int"), new BaseType("Int"))),
        2,
        (x,y) => Constant.pri_n(parseInt(x.name, 10) - parseInt(y.name, 10))),
    
    constant_plus   : new Primitive(
        "PLUS",
        new FunctionType(new BaseType("Int"), new FunctionType(new BaseType("Int"), new BaseType("Int"))),
        2,
        (x,y) => Constant.pri_n(parseInt(x.name,10) + parseInt(y.name,10))),
    
    constant_div    : new Primitive(
        "DIV",
        new FunctionType(new BaseType("Int"), new FunctionType(new BaseType("Int"), new BaseType("Int"))),
        2,
        (x,y) => Constant.pri_n(Math.floor(parseInt(x.name,10) / parseInt(y.name,10)))),
    
    constant_eq     : new Primitive(
        "EQ",
        new FunctionType(new BaseType("Int"), new FunctionType(new BaseType("Int"), new BaseType("Bool"))),
        2,
        (x,y) => x.name != y.name ? Constant.pri_false : Constant.pri_true),
    
    constant_leq    : new Primitive(
        "LEQ",
        new FunctionType(new BaseType("Int"), new FunctionType(new BaseType("Int"), new BaseType("Bool"))),
        2,
        (x,y) => parseInt(x.name, 10) <= parseInt(y.name, 10) ? Constant.pri_true : Constant.pri_false),
    
    constant_not    : new Primitive(
        "NOT",
        new FunctionType(new BaseType("Bool"), new BaseType("Bool")),
        1,
        (a) => a.equals(Constant.pri_true) ? Constant.pri_false : Constant.pri_true),
    
    constant_ite    : new Primitive(
        "ITE",
        new FunctionType(new BaseType("Bool"), new FunctionType(new TypeVariable('??'), new FunctionType(new TypeVariable('??'), new TypeVariable('??')))),
        3,
        (a,b,c) => a.equals(Constant.pri_true) ? b : c),

    constant_succ   : new Primitive(
        "SUCC",
        new FunctionType(new BaseType('Int'), new BaseType('Int')),
        1,
        (x) => Constant.pri_n(parseInt(x.name) + 1)),
    
    constant_pred   : new Primitive(
        "PRED",
        new FunctionType(new BaseType('Int'), new BaseType('Int')),
        1,
        (x) => Constant.pri_n(parseInt(x.name) - 1)),
    
    constant_iszero : new Primitive(
        "ISZERO",
        new FunctionType(new BaseType('Int'), new BaseType('Bool')),
        1,
        (x) => x.equals(Constant.pri_n(0)) ? Constant.pri_true : Constant.pri_false),
    
    constant_or     : new Primitive(
        "OR",
        new FunctionType(new BaseType("Bool"), new FunctionType(new BaseType("Bool"), new BaseType("Bool"))), 
        2,
        (x,y) => x.equals(Constant.pri_true) || y.equals(Constant.pri_true) ? Constant.pri_true : Constant.pri_false),
    
    constant_and    : new Primitive(
        "AND",
        new FunctionType(new BaseType("Bool"), new FunctionType(new BaseType("Bool"), new BaseType("Bool"))),
        2,
        (x,y) => x.equals(Constant.pri_true) && y.equals(Constant.pri_true) ? Constant.pri_true : Constant.pri_false),
    
    constant_fix    : new Primitive(
        "FIX",
        new FunctionType(new FunctionType(new TypeVariable('??'), new TypeVariable('??')), new TypeVariable('??')),
        1,
        (x) => Evaluator.applyBetaStep(new App(x, new App(Constant.constant_fix, x)))),

    // add to the global OLCE object namespace 
    addConstantsAndAliases() {
        var a = (x, y) => OLCE.Data.aliases.addAlias(x, y);
        var b = (x)    => OLCE.Data.constants.push(x);
        var p = (s)    => Parser.parse(s);
    
        //aliases
        a("ITE",    p("(??x.(??y.(??z.((x y) z))))"));
        a("FALSE",  p("(??x.(??y.y))"));
        a("TRUE",   p("(??x.(??y.x))"));
        a("OR",     p("(??y.(??x.((y y) x)))"));
        a("AND",    p("(??y.(??x.((y x) y)))"));
        a("NOT",    p("(??x.((x (??x.(??y.y))) (??x.(??y.x))))"));
        a("PLUS",   p("(??m.(??n.(??f.(??x.((m f) ((n f) x))))))"));
        a("MINUS",  p("(??m.(??n.((n (??n.(??f.(??x.(((n (??g.(??h.(h (g f))))) (??u.x)) (??u.u)))))) m)))"));
        a("TIMES",  p("(??m.(??n.(??f.(m (n f)))))"));
        a("SUCC",   p("(??n.(??f.(??x.(f ((n f) x)))))"));
        a("PRED",   p("(??n.(??f.(??x.(((n (??g.(??h.(h (g f))))) (??u.x)) (??u.u)))))"));
        a("DIV",    p("(??n.(((??f.((??x.(f (x x))) (??x.(f (x x))))) (??c.(??n.(??m.(??f.(??x.((??d.((((??n.((n (??x.(??x.(??y.y)))) (??x.(??y.x)))) d) (((??f.(??x.x)) f) x)) (f ((((c d) m) f) x)))) (((??m.(??n.((n (??n.(??f.(??x.(((n (??g.(??h.(h (g f))))) (??u.x)) (??u.u)))))) m))) n) m)))))))) ((??n.(??f.(??x.(f ((n f) x))))) n)))"));
        a("??",      p("((??x.(x x)) (??x.(x x)))"));
        a("OMEGA",  p("((??x.(x x)) (??x.(x x)))"));
        a("??",      p("((??x.(??f.(f ((x x) f)))) (??x.(??f.(f ((x x) f)))))"));
        a("THETA",  p("((??x.(??f.(f ((x x) f)))) (??x.(??f.(f ((x x) f)))))"));
        a("ISZERO", p("(??n.((n (??x.(??x.(??y.y)))) (??x.(??y.x))))"));
        a("LEQ",    p("(??m.(??n.((??n.((n (??x.(??x.(??y.y)))) (??x.(??y.x)))) (((??m.(??n.((n (??n.(??f.(??x.(((n (??g.(??h.(h (g f))))) (??u.x)) (??u.u)))))) m))) m) n))))"));
        a("EQ",     p(" (??m.(??n.(((??y.(??x.((y x) y))) (((??m.(??n.((??n.((n (??x.(??x.(??y.y)))) (??x.(??y.x)))) (((??m.(??n.((n (??n.(??f.(??x.(((n (??g.(??h.(h (g f))))) (??u.x)) (??u.u)))))) m))) m) n)))) m) n)) (((??m.(??n.((??n.((n (??x.(??x.(??y.y)))) (??x.(??y.x)))) (((??m.(??n.((n (??n.(??f.(??x.(((n (??g.(??h.(h (g f))))) (??u.x)) (??u.u)))))) m))) m) n)))) n) m))))"));
        a("Y",      p("(??f.((??x.(f (x x))) (??x.(f (x x)))))"));
        a("S",      p("(??xyz.((xz)(yz)))"));
        a("K",      p("(??ij.i)"));
        a("I",      p("(??i.i)"));
    
        b(this.constant_iszero);
        b(this.constant_pred);
        b(this.constant_succ);
        b(this.constant_times);
        b(this.constant_plus);
        b(this.constant_minus);
        b(this.constant_div);
        b(this.constant_eq);
        b(this.constant_leq);
        b(this.constant_ite);
        b(this.constant_and);
        b(this.constant_not);
        b(this.constant_or);
        b(this.pri_true);
        b(this.pri_false);
        b(this.constant_s_comb);
        b(this.constant_k_comb);
        b(this.constant_i_comb);
        b(this.constant_fix);
    },
}//Constant
