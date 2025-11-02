"""
PyView Code Quality Metrics

Implements code quality metrics including:
- Cyclomatic Complexity
- Maintainability Index
"""

import ast
from dataclasses import dataclass, field
from typing import Dict, List, Set, Optional, Any
from pathlib import Path
import math

from .models import MethodInfo, ClassInfo, ModuleInfo


@dataclass
class ComplexityMetrics:
    """Code complexity metrics for a method/function"""
    cyclomatic_complexity: int = 1  # Base complexity
    cognitive_complexity: int = 0   # Cognitive complexity (how hard to understand)
    nesting_depth: int = 0          # Maximum nesting depth
    lines_of_code: int = 0         # Physical lines
    logical_lines: int = 0         # Logical lines of code


@dataclass
class QualityMetrics:
    """Combined code quality metrics"""
    complexity: ComplexityMetrics = field(default_factory=ComplexityMetrics)
    maintainability_index: float = 0.0


class ComplexityAnalyzer(ast.NodeVisitor):
    """AST visitor to calculate cyclomatic and cognitive complexity"""

    def __init__(self):
        self.complexity = 1  # Base cyclomatic complexity
        self.cognitive_complexity = 0  # Cognitive complexity
        self.nesting_depth = 0  # Current nesting depth
        self.max_nesting_depth = 0  # Maximum nesting depth
        self.nesting_stack = []  # Track nesting levels

    def visit_If(self, node):
        self.complexity += 1
        self.cognitive_complexity += 1 + self.nesting_depth
        self.nesting_depth += 1
        self.max_nesting_depth = max(self.max_nesting_depth, self.nesting_depth)
        self.generic_visit(node)
        self.nesting_depth -= 1

    def visit_For(self, node):
        self.complexity += 1
        self.cognitive_complexity += 1 + self.nesting_depth
        self.nesting_depth += 1
        self.max_nesting_depth = max(self.max_nesting_depth, self.nesting_depth)
        self.generic_visit(node)
        self.nesting_depth -= 1

    def visit_While(self, node):
        self.complexity += 1
        self.cognitive_complexity += 1 + self.nesting_depth
        self.nesting_depth += 1
        self.max_nesting_depth = max(self.max_nesting_depth, self.nesting_depth)
        self.generic_visit(node)
        self.nesting_depth -= 1

    def visit_Try(self, node):
        self.complexity += len(node.handlers)
        self.cognitive_complexity += len(node.handlers)
        self.generic_visit(node)

    def visit_With(self, node):
        self.complexity += 1
        self.cognitive_complexity += 1
        self.generic_visit(node)

    def visit_BoolOp(self, node):
        if isinstance(node.op, (ast.And, ast.Or)):
            self.complexity += len(node.values) - 1
            self.cognitive_complexity += len(node.values) - 1
        self.generic_visit(node)

    def visit_comprehension(self, node):
        self.complexity += 1
        self.cognitive_complexity += 1
        for if_clause in node.ifs:
            self.complexity += 1
            self.cognitive_complexity += 1
        self.generic_visit(node)
        


class CodeMetricsEngine:
    """Main engine for calculating code quality metrics"""
    
    def __init__(self):
        pass
        
    def analyze_method_complexity(self, method: MethodInfo, source_code: str) -> ComplexityMetrics:
        """Analyze complexity metrics for a method"""
        try:
            # Parse just the method's AST node
            tree = ast.parse(source_code)

            # Find the method node
            for node in ast.walk(tree):
                if isinstance(node, ast.FunctionDef) and node.name == method.name:
                    analyzer = ComplexityAnalyzer()
                    analyzer.visit(node)

                    # Count lines of code
                    lines = source_code.split('\n')
                    physical_lines = len([line for line in lines if line.strip()])
                    logical_lines = len([line for line in lines
                                       if line.strip() and not line.strip().startswith('#')])

                    return ComplexityMetrics(
                        cyclomatic_complexity=analyzer.complexity,
                        cognitive_complexity=analyzer.cognitive_complexity,
                        nesting_depth=analyzer.max_nesting_depth,
                        lines_of_code=physical_lines,
                        logical_lines=logical_lines
                    )

        except Exception as e:
            # Return default metrics if parsing fails
            pass

        return ComplexityMetrics()
    
    def analyze_class_quality(self, class_info: ClassInfo, module_source: str) -> QualityMetrics:
        """Analyze quality metrics for a class"""
        # class_info가 객체인 경우와 딕셔너리인 경우 둘 다 처리하기 위해 추가
        if isinstance(class_info, (str, dict)):
            class_name = class_info.get('name') if isinstance(class_info, dict) else str(class_info)
            return self._analyze_class_from_source(class_name, module_source)

        try:
            # 메서드가 String ID이면 skip(아직 오류 발생. 수정 필요)
            if class_info.methods and isinstance(class_info.methods[0], str):
                return self._analyze_class_from_source(class_info.name, module_source)
        except Exception as e:
            print(f"ERROR in analyze_class_quality (type check): {e}, class_info type: {type(class_info)}")
            return self._analyze_class_from_source(getattr(class_info, 'name', 'Unknown'), module_source)

        # Calculate average complexity for class methods
        total_complexity = 0
        total_loc = 0
        method_count = 0

        for method in class_info.methods:
            try:
                method_metrics = self.analyze_method_complexity(method, module_source)
                total_complexity += method_metrics.cyclomatic_complexity
                total_loc += method_metrics.lines_of_code
                method_count += 1
            except:
                continue

        avg_complexity = total_complexity / method_count if method_count > 0 else 1

        # Calculate Maintainability Index (simplified version)
        # MI = 171 - 5.2 * ln(Halstead Volume) - 0.23 * (Cyclomatic Complexity) - 16.2 * ln(Lines of Code)
        # Using simplified approximation
        lines_of_code = max(1, total_loc if total_loc > 0 else 10)
        maintainability_index = max(0, 171 - 0.23 * avg_complexity - 16.2 * math.log(lines_of_code))

        return QualityMetrics(
            complexity=ComplexityMetrics(
                cyclomatic_complexity=int(avg_complexity),
                lines_of_code=total_loc
            ),
            maintainability_index=maintainability_index
        )

    def _analyze_class_from_source(self, class_name: str, module_source: str) -> QualityMetrics:
        """Analyze quality metrics for a class by parsing source code"""
        try:
            # 코드 파싱
            tree = ast.parse(module_source)

            # 클래스 정의들 순회하며 찾음
            for node in ast.walk(tree):
                # 클래스 이름이 일치하면 내부 메서드 분석
                if isinstance(node, ast.ClassDef) and node.name == class_name:
                    total_complexity = 0
                    total_cognitive = 0
                    total_loc = 0
                    method_count = 0
                    max_nesting = 0

                    # 메서드 각각 반영해 복잡도 직접 계산(ComplexityAnalyzer)
                    for item in node.body:
                        if isinstance(item, ast.FunctionDef):
                            analyzer = ComplexityAnalyzer()
                            analyzer.visit(item)

                            total_complexity += analyzer.complexity
                            total_cognitive += analyzer.cognitive_complexity
                            max_nesting = max(max_nesting, analyzer.max_nesting_depth)

                            # Count lines for this method
                            if hasattr(item, 'lineno') and hasattr(item, 'end_lineno'):
                                method_lines = item.end_lineno - item.lineno + 1
                                total_loc += method_lines

                            method_count += 1

                    # 퍙군 복잡도 계산
                    avg_complexity = total_complexity / method_count if method_count > 0 else 1
                    lines_of_code = max(1, total_loc if total_loc > 0 else 10)

                    # 유지보수성 지수 계산, 현재는 대략적인 복잡도만 추정. 수정 필요
                    maintainability_index = max(0, 171 - 0.23 * avg_complexity - 16.2 * math.log(lines_of_code))

                    return QualityMetrics(
                        complexity=ComplexityMetrics(
                            cyclomatic_complexity=int(avg_complexity),
                            cognitive_complexity=total_cognitive // method_count if method_count > 0 else 0,
                            nesting_depth=max_nesting,
                            lines_of_code=total_loc
                        ),
                        maintainability_index=maintainability_index
                    )

            # 클래스 못 찾았을 경우 LOC를 이용해 대략적인 복잡도 추정
            # (MI \approx 171 - 0.23C - 16.2\ln(LOC))
            lines = module_source.split('\n')
            loc = len([line for line in lines if line.strip()])
            complexity = max(1, loc // 10)
            maintainability = max(0, 171 - 0.23 * complexity - 16.2 * math.log(max(1, loc)))

            return QualityMetrics(
                complexity=ComplexityMetrics(
                    cyclomatic_complexity=complexity,
                    lines_of_code=loc
                ),
                maintainability_index=maintainability
            )

        except Exception as e:
            # exception 시에도 LOC 이용해 계산. 임시 로직.
            lines = module_source.split('\n')
            loc = len([line for line in lines if line.strip()])
            complexity = max(1, loc // 10)
            maintainability = max(0, 171 - 0.23 * complexity - 16.2 * math.log(max(1, loc)))

            return QualityMetrics(
                complexity=ComplexityMetrics(
                    cyclomatic_complexity=complexity,
                    lines_of_code=loc
                ),
                maintainability_index=maintainability
            )

    def analyze_module_quality(self, module_info: ModuleInfo, source_code: str) -> QualityMetrics:
        """Analyze quality metrics for a module"""
        # module_info가 객체인 경우와 딕셔너리인 경우 둘 다 다루기 위해 사용
        if isinstance(module_info, (str, dict)):
            lines_of_code = len(source_code.split('\n'))
            complexity = max(1, lines_of_code // 20)
            maintainability_index = max(0, 171 - 0.23 * complexity - 16.2 * math.log(max(1, lines_of_code)))
            return QualityMetrics(
                complexity=ComplexityMetrics(cyclomatic_complexity=complexity, lines_of_code=lines_of_code),
                maintainability_index=maintainability_index
            )

        try:
            # 클래스가 String Id이면 skip. 수정 필요
            if module_info.classes and isinstance(module_info.classes[0], str):
                # Return default metrics based on module size
                lines_of_code = len(source_code.split('\n'))
                complexity = max(1, lines_of_code // 20)  # Rough estimate
                maintainability_index = max(0, 171 - 0.23 * complexity - 16.2 * math.log(max(1, lines_of_code)))
                return QualityMetrics(
                    complexity=ComplexityMetrics(cyclomatic_complexity=complexity, lines_of_code=lines_of_code),
                    maintainability_index=maintainability_index
                )
        except Exception as e:
            # 에러 메시지 띄우지만 일단 LOC 이용한 단순한 계산만 수행. 임시 코드
            print(f"ERROR in analyze_module_quality (type check): {e}, module_info type: {type(module_info)}")
            lines_of_code = len(source_code.split('\n'))
            complexity = max(1, lines_of_code // 20)
            return QualityMetrics(
                complexity=ComplexityMetrics(cyclomatic_complexity=complexity, lines_of_code=lines_of_code),
                maintainability_index=70.0
            )

        total_complexity = 0
        total_loc = 0
        class_count = 0

        # Aggregate metrics from all classes in module
        for class_info in module_info.classes:
            if isinstance(class_info, str):
                continue  # Skip string IDs
            class_metrics = self.analyze_class_quality(class_info, source_code)
            total_complexity += class_metrics.complexity.cyclomatic_complexity
            total_loc += class_metrics.complexity.lines_of_code
            class_count += 1

        if class_count > 0:
            avg_complexity = total_complexity / class_count
        else:
            avg_complexity = 1

        # Module-level maintainability
        lines_of_code = len(source_code.split('\n'))
        maintainability_index = max(0, 171 - 0.23 * avg_complexity - 16.2 * math.log(max(1, lines_of_code)))

        return QualityMetrics(
            complexity=ComplexityMetrics(
                cyclomatic_complexity=int(avg_complexity),
                lines_of_code=total_loc if class_count > 0 else lines_of_code
            ),
            maintainability_index=maintainability_index
        )
    
    def get_quality_rating(self, metrics: QualityMetrics) -> str:
        """Get a quality rating based on metrics"""
        score = 0
        
        # Complexity score (lower is better) - 50 points
        if metrics.complexity.cyclomatic_complexity <= 10:
            score += 50
        elif metrics.complexity.cyclomatic_complexity <= 20:
            score += 30
        elif metrics.complexity.cyclomatic_complexity <= 50:
            score += 15
            
        # Maintainability score - 50 points
        if metrics.maintainability_index >= 85:
            score += 50
        elif metrics.maintainability_index >= 65:
            score += 30
        elif metrics.maintainability_index >= 40:
            score += 15
            
        # Convert to letter grade
        if score >= 85:
            return "A"
        elif score >= 70:
            return "B"
        elif score >= 55:
            return "C"
        elif score >= 40:
            return "D"
        else:
            return "F"